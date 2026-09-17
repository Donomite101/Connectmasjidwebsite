import React from 'react';
import { Navigation, BellRing, Play, Clock, Plus, MousePointer } from 'lucide-react';

export default function Features({ onExplore }) {
  return (
    <section className="features-v3" id="features" aria-label="App features">
      <div className="cards-grid-3col">

        {/* ── CARD 1: ACCURATE PRAYER TIMES ── */}
        <div className="card-3col">
          <div className="card-3col-top">
            <h3 className="card-3col-title">
              Accurate Prayer<br />Times
            </h3>
            <div className="card-3col-icon-green">
              <Navigation size={28} fill="#00b83b" color="#00b83b" style={{ transform: 'rotate(45deg)' }} />
            </div>
          </div>

          <div className="card-3col-body">
            <div className="card-3col-location">
              Baitul Markaz, Indapur • 3mins by walk
            </div>

            <div className="card-inner-box">
              <div className="card-prayer-name">Zuhr</div>
              <div className="card-prayer-time-large">01:00PM</div>
              <div className="card-time-pill-dark">
                <span className="card-pill-bar" />
                starts in 36 mins
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2: GET NOTICES OF YOUR MASJID ── */}
        <div className="card-3col">
          <div className="card-3col-top-stacked">
            <div className="card-megaphone-icon">
              <BellRing size={38} color="#00b83b" strokeWidth={2.2} />
            </div>
            <h3 className="card-3col-title" style={{ marginTop: 18 }}>
              Get Notices of<br />Your Masjid<br />
              <span className="text-green-accent">Instantly</span>
            </h3>
          </div>

          <div className="card-3col-body">
            <div className="card-3col-location" style={{ marginBottom: 12 }}>
              Masjid Admin Board • 5mins ago
            </div>

            {/* Inner Notice Card UI */}
            <div className="card-notice-box">
              <div className="card-notice-header">
                <span className="card-notice-pin">📌 Official Notice</span>
                <span className="card-notice-badge">VERIFIED</span>
              </div>
              <div className="card-notice-heading">Jumuah Khutbah Timing</div>
              <p className="card-notice-text">
                Khutbah starts at 01:15 PM sharp. Please bring your own prayer mat.
              </p>
            </div>

            <div className="card-footer-sub">
              Direct Mosque Announcements &amp; Notices
            </div>
          </div>
        </div>

        {/* ── CARD 3: REMINDERS 15 MINS BEFORE ── */}
        <div className="card-3col">
          <div className="card-3col-top">
            <h3 className="card-3col-title">
              Reminders?<br />
              <span className="text-green-accent">15 mins Before</span><br />
              Just Like Dad
            </h3>
          </div>

          <div className="card-3col-body">
            {/* Inner box with floating alarm plus button */}
            <div className="card-inner-box" style={{ position: 'relative' }}>
              <div className="card-prayer-name">Isha</div>
              <div className="card-prayer-time-large" style={{ fontSize: '1.9rem', margin: '4px 0 10px' }}>07:30pm</div>
              
              <div className="card-time-pill-light">
                <Clock size={13} color="#666" />
                starts in 1 Hour 36 mins
              </div>

              {/* Floating Alarm Plus Badge & Mouse Cursor Pointer */}
              <div className="card-alarm-pointer-badge">
                <div className="alarm-plus-circle">
                  <Plus size={16} color="#ffffff" strokeWidth={3} />
                </div>
                <div className="cursor-pointer-icon">
                  <MousePointer size={22} fill="#0a0a08" color="#0a0a08" />
                </div>
              </div>
            </div>

            <div className="card-3col-location" style={{ marginTop: 18 }}>
              Baitul Markaz, Indapur • 3mins by walk
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
