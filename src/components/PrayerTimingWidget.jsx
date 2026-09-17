import React, { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, ChevronUp, ChevronDown, Volume2, VolumeX, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import './PrayerTimingWidget.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://connectmasjid.duckdns.org/api';

/* Web Audio API Synthesizer for pleasant Adhan & Jamaat Alert sound */
function playAlertChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Tone 1 (G4 - 392Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(392, ctx.currentTime);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 1.2);

    // Tone 2 (C5 - 523.25Hz) after 0.35s delay
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(523.25, ctx.currentTime + 0.35);
    gain2.gain.setValueAtTime(0.35, ctx.currentTime + 0.35);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.85);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.35);
    osc2.stop(ctx.currentTime + 1.85);
  } catch (e) {
    console.error('Audio chime play error:', e);
  }
}

export default function PrayerTimingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mosque, setMosque] = useState(null);
  const [nextPrayer, setNextPrayer] = useState({ name: 'Fajr', type: 'Jamaat', time: '--:--', countdown: '' });
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [alertType, setAlertType] = useState(() => {
    return localStorage.getItem('cm_alert_type') || 'both'; // 'azan', 'jamaat', 'both'
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('cm_alert_sound') !== 'false';
  });

  const lastNotifiedRef = useRef('');

  // Check current Notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotifEnabled(Notification.permission === 'granted');
    }
  }, []);

  // Save settings to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('cm_alert_type', alertType);
      localStorage.setItem('cm_alert_sound', String(soundEnabled));
    } catch (e) { /* ignore */ }
  }, [alertType, soundEnabled]);

  // Format 24h to 12h AM/PM
  function format12h(timeStr) {
    if (!timeStr) return '--:--';
    const clean = String(timeStr).trim().split(' ')[0];
    const parts = clean.split(':');
    if (parts.length < 2) return String(timeStr);
    let h = parseInt(parts[0], 10);
    const m = parts[1].padStart(2, '0');
    if (isNaN(h)) return String(timeStr);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }

  // Parse timeStr into total minutes from midnight
  function getMinFromTime(timeStr) {
    if (!timeStr) return null;
    const clean = String(timeStr).trim().split(' ')[0];
    const parts = clean.split(':');
    if (parts.length < 2) return null;
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  }

  // Calculate Next Prayer Event (Adhan or Jama'at) & Trigger Alert
  const calcNextPrayer = (m) => {
    if (!m) return;
    const now = new Date();
    const currentMin = now.getHours() * 60 + now.getMinutes();

    const events = [];
    const prayerKeys = [
      { name: 'Fajr', azan: m.fajr_azan || m.fajr_time, jamaat: m.fajr_jamaat },
      { name: 'Dhuhr', azan: m.dhuhr_azan || m.dhuhr_time, jamaat: m.dhuhr_jamaat },
      { name: 'Asr', azan: m.asr_azan || m.asr_time, jamaat: m.asr_jamaat },
      { name: 'Maghrib', azan: m.maghrib_azan || m.maghrib_time, jamaat: m.maghrib_jamaat },
      { name: 'Isha', azan: m.isha_azan || m.isha_time, jamaat: m.isha_jamaat },
    ];

    prayerKeys.forEach((p) => {
      let azanMin = getMinFromTime(p.azan);
      const jamaatMin = getMinFromTime(p.jamaat);
      if (azanMin === null && jamaatMin !== null) {
        azanMin = Math.max(0, jamaatMin - 15);
      }

      if (azanMin !== null) {
        events.push({ name: p.name, type: 'Azan', min: azanMin, rawTime: p.azan || p.jamaat });
      }
      if (jamaatMin !== null) {
        events.push({ name: p.name, type: 'Jamaat', min: jamaatMin, rawTime: p.jamaat });
      }
    });

    events.sort((a, b) => a.min - b.min);

    for (let ev of events) {
      if (ev.min > currentMin) {
        const diff = ev.min - currentMin;
        const hrs = Math.floor(diff / 60);
        const mins = diff % 60;
        const cdStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins} mins`;

        setNextPrayer({
          name: ev.name,
          type: ev.type,
          time: format12h(ev.rawTime),
          countdown: cdStr,
        });

        // Trigger real-time alert if exact minute matches (diff === 0)
        const eventKey = `${m.id}-${ev.name}-${ev.type}-${ev.min}`;
        if (diff === 0 && lastNotifiedRef.current !== eventKey) {
          lastNotifiedRef.current = eventKey;

          const shouldAlert =
            (ev.type === 'Azan' && (alertType === 'azan' || alertType === 'both')) ||
            (ev.type === 'Jamaat' && (alertType === 'jamaat' || alertType === 'both'));

          if (shouldAlert) {
            if (soundEnabled) playAlertChime();

            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(`🕌 ${ev.name} ${ev.type} Alert`, {
                body: `${ev.type} time for ${m.name} is now ${format12h(ev.rawTime)}!`,
                icon: '/applogo.jpeg',
              });
            }
          }
        }
        return;
      }
    }

    // Default fallback to Fajr tomorrow
    setNextPrayer({
      name: 'Fajr',
      type: 'Jamaat',
      time: format12h(m.fajr_jamaat),
      countdown: 'Tomorrow',
    });
  };

  // Fetch live timings with LocalStorage cache fallback
  useEffect(() => {
    async function loadWidgetData() {
      try {
        const cached = localStorage.getItem('cm_cached_mosques');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMosque(parsed[0]);
            calcNextPrayer(parsed[0]);
          }
        }
      } catch (e) { /* ignore */ }

      try {
        const res = await fetch(`${API_BASE_URL}/mosques`);
        if (res.ok) {
          const resData = await res.json();
          if (resData.status === 'SUCCESS' && Array.isArray(resData.data) && resData.data.length > 0) {
            const m = resData.data[0];
            setMosque(m);
            calcNextPrayer(m);
          }
        }
      } catch (e) {
        console.error('Widget live API error:', e);
      }
    }

    loadWidgetData();
    const interval = setInterval(loadWidgetData, 30000); // Check every 30s for exact alerts

    const handleAddWidgetEvent = (e) => {
      if (e.detail) {
        setMosque(e.detail);
        calcNextPrayer(e.detail);
        setIsOpen(true);
      }
    };
    window.addEventListener('cm_add_widget', handleAddWidgetEvent);

    return () => {
      clearInterval(interval);
      window.removeEventListener('cm_add_widget', handleAddWidgetEvent);
    };
  }, [alertType, soundEnabled]);

  // Request Notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Browser notifications are not supported on this device.');
      return;
    }
    if (Notification.permission === 'granted') {
      if (soundEnabled) playAlertChime();
      new Notification('🕌 ConnectMasjid Adhan & Jamaat Alerts Active', {
        body: `Real-time desktop alerts active for ${mosque ? mosque.name : 'your masjid'}!`,
        icon: '/applogo.jpeg',
      });
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotifEnabled(true);
      if (soundEnabled) playAlertChime();
      new Notification('🕌 ConnectMasjid Alerts Enabled!', {
        body: 'You will now receive live Adhan & Jamaat notifications.',
        icon: '/applogo.jpeg',
      });
    } else {
      setNotifEnabled(false);
      alert('Notification permission was denied. Please enable it in browser settings.');
    }
  };

  if (!mosque) return null;

  return (
    <div className={`cm-widget-container ${isOpen ? 'open' : ''}`}>
      {/* Floating Pill Toggle Button */}
      <div className="cm-widget-pill" onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        <div className="pill-live-dot" />
        <div className="pill-info">
          <span className="pill-next-label">
            Next: <strong>{nextPrayer.name} ({nextPrayer.type})</strong>
          </span>
          <span className="pill-time">{nextPrayer.time} ({nextPrayer.countdown})</span>
        </div>
        <button className="pill-toggle-icon" aria-label="Toggle widget details">
          {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {/* Expanded Widget Popup Card */}
      {isOpen && (
        <div className="cm-widget-card">
          <div className="widget-card-header">
            <div>
              <h4 className="widget-mosque-name">{mosque.name}</h4>
              <span className="widget-mosque-sub">{mosque.city || 'Verified Mosque'}</span>
            </div>
            <button
              className={`widget-notif-btn ${notifEnabled ? 'active' : ''}`}
              onClick={requestNotificationPermission}
              title={notifEnabled ? 'Adhan & Jamaat Alerts Active' : 'Enable Desktop Alerts'}
              aria-label="Adhan Notifications"
            >
              {notifEnabled ? <Bell size={18} color="#00b83b" /> : <BellOff size={18} color="#94a3b8" />}
            </button>
          </div>

          {/* Alert Mode Selector Pill Bar */}
          <div className="widget-alert-mode-row">
            <span className="alert-mode-label">Alert Mode:</span>
            <div className="alert-mode-pills">
              <button
                className={`mode-pill ${alertType === 'azan' ? 'active' : ''}`}
                onClick={() => setAlertType('azan')}
              >
                Azan
              </button>
              <button
                className={`mode-pill ${alertType === 'jamaat' ? 'active' : ''}`}
                onClick={() => setAlertType('jamaat')}
              >
                Jamaat
              </button>
              <button
                className={`mode-pill ${alertType === 'both' ? 'active' : ''}`}
                onClick={() => setAlertType('both')}
              >
                Both
              </button>
            </div>
            <button
              className={`sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Audio Chime Enabled' : 'Mute Sound'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>

          {/* 5-Prayer Timings Grid */}
          <div className="widget-timings-grid">
            {[
              { name: 'Fajr', val: mosque.fajr_jamaat },
              { name: 'Dhuhr', val: mosque.dhuhr_jamaat },
              { name: 'Asr', val: mosque.asr_jamaat },
              { name: 'Maghrib', val: mosque.maghrib_jamaat },
              { name: 'Isha', val: mosque.isha_jamaat },
            ].map((p) => {
              const isHighlight = nextPrayer.name === p.name;
              return (
                <div key={p.name} className={`widget-row ${isHighlight ? 'highlight' : ''}`}>
                  <span>{p.name}</span>
                  <strong>{format12h(p.val)}</strong>
                </div>
              );
            })}
          </div>

          <button className="widget-notif-cta-btn" onClick={requestNotificationPermission}>
            <Bell size={16} />
            {notifEnabled ? 'Adhan & Jamaat Alerts Enabled ✓' : 'Enable Desktop Adhan Alerts'}
          </button>
        </div>
      )}
    </div>
  );
}
