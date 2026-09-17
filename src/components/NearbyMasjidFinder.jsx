import React, { useState, useEffect, useCallback } from 'react';
import { Navigation, MapPin, Clock, ShieldCheck, RefreshCw, CheckCircle2, Search, Heart, Users, PlusCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://connectmasjid.duckdns.org/api';

/* ── Security Input & XSS Sanitizer ── */
function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/* ── Convert 24h SQL format (13:20:00) to 12h display (01:20 PM) ── */
function formatTime(timeStr) {
  if (!timeStr) return '--:--';
  const clean = String(timeStr).split(' ')[0];
  const parts = clean.split(':');
  if (parts.length < 2) return String(timeStr);
  let h = parseInt(parts[0], 10);
  const m = parts[1].padStart(2, '0');
  if (isNaN(h)) return String(timeStr);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
}

/* ── Calculate Haversine distance in km ── */
function calcDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371;
  const dLat = ((parseFloat(lat2) - parseFloat(lat1)) * Math.PI) / 180;
  const dLon = ((parseFloat(lon2) - parseFloat(lon1)) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((parseFloat(lat1) * Math.PI) / 180) *
    Math.cos((parseFloat(lat2) * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/* ── Format time matching screenshot: "5:30 am" ── */
function formatPrayerTime(timeStr) {
  if (!timeStr) return '--:--';
  const clean = String(timeStr).trim().split(' ')[0];
  const parts = clean.split(':');
  if (parts.length < 2) return String(timeStr);
  let h = parseInt(parts[0], 10);
  const m = parts[1].padStart(2, '0');
  if (isNaN(h)) return String(timeStr);
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

/* ── Generate date selector pills (Today + 8 days) ── */
function generateDates() {
  const dates = [];
  const today = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  for (let i = 0; i < 9; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      day: d.getDate(),
      month: months[d.getMonth()],
      fullDate: d.toISOString().split('T')[0],
      isToday: i === 0,
    });
  }
  return dates;
}

/* ── Build Full Detailed Address String ── */
function buildFullAddress(m) {
  if (!m) return '';
  const parts = [
    m.address_line_1,
    m.address_line_2,
    m.city,
    m.postal_code,
    'India'
  ].filter(Boolean);
  return parts.join(', ');
}

/* ── Stylized Fake Map Tile Graphic UI (Offline, 0 Network Calls) ── */
function VectorMapTilesBackground() {
  return (
    <div className="nearby-bg-map-graphic" aria-hidden="true">
      <svg className="vector-map-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="map-tile-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="2" fill="rgba(15, 23, 42, 0.12)" />
          </pattern>

          <linearGradient id="park-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dcfce7" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="river-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* 1. Base Map Tile Canvas & Grid */}
        <rect width="100%" height="100%" fill="#f1f5f9" />
        <rect width="100%" height="100%" fill="url(#map-tile-grid)" />

        {/* 2. City Park Contours */}
        <path d="M 120 180 Q 240 140 380 200 T 520 320 Q 420 450 280 400 Z" fill="url(#park-grad)" stroke="rgba(34, 197, 94, 0.35)" strokeWidth="1.5" />
        <path d="M 850 80 Q 1020 120 1150 240 T 1000 480 Q 820 380 850 80 Z" fill="url(#park-grad)" stroke="rgba(34, 197, 94, 0.35)" strokeWidth="1.5" />

        {/* 3. River Flow */}
        <path d="M -50 480 C 300 420, 450 650, 800 580 C 1100 520, 1300 680, 1500 620 L 1500 850 L -50 850 Z" fill="url(#river-grad)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" />

        {/* 4. Secondary Street Grid Network */}
        <g stroke="rgba(148, 163, 184, 0.75)" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <line x1="0" y1="120" x2="1400" y2="120" />
          <line x1="0" y1="260" x2="1400" y2="260" />
          <line x1="0" y1="420" x2="1400" y2="420" />
          <line x1="0" y1="580" x2="1400" y2="580" />

          <line x1="180" y1="0" x2="180" y2="800" />
          <line x1="420" y1="0" x2="420" y2="800" />
          <line x1="680" y1="0" x2="680" y2="800" />
          <line x1="940" y1="0" x2="940" y2="800" />
          <line x1="1200" y1="0" x2="1200" y2="800" />
        </g>

        {/* 5. Major Arterial Avenues */}
        <g stroke="#ffffff" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -50 220 C 350 180, 700 340, 1450 200" />
          <path d="M 320 -50 C 340 300, 520 500, 550 850" />
          <path d="M 980 -50 C 950 250, 1100 550, 1150 850" />
        </g>
        <g stroke="rgba(71, 85, 105, 0.65)" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -50 220 C 350 180, 700 340, 1450 200" />
          <path d="M 320 -50 C 340 300, 520 500, 550 850" />
          <path d="M 980 -50 C 950 250, 1100 550, 1150 850" />
        </g>

        {/* 6. City Building Footprints */}
        <g fill="rgba(255, 255, 255, 0.9)" stroke="rgba(148, 163, 184, 0.9)" strokeWidth="1.5">
          <rect x="220" y="140" width="70" height="40" rx="4" />
          <rect x="300" y="140" width="50" height="40" rx="4" />
          <rect x="220" y="190" width="130" height="50" rx="4" />

          <rect x="720" y="280" width="90" height="60" rx="4" />
          <rect x="820" y="280" width="80" height="60" rx="4" />
          <rect x="720" y="350" width="180" height="50" rx="4" />

          <rect x="460" y="440" width="100" height="60" rx="4" />
          <rect x="570" y="440" width="80" height="60" rx="4" />
        </g>

        {/* 7. Stylized Vector Location Markers */}
        <g transform="translate(380, 240)">
          <circle cx="0" cy="0" r="16" fill="#00b83b" />
          <circle cx="0" cy="0" r="6" fill="#ffffff" />
        </g>

        <g transform="translate(760, 360)">
          <circle cx="0" cy="0" r="16" fill="#0a0a08" />
          <circle cx="0" cy="0" r="6" fill="#ffffff" />
        </g>

        <g transform="translate(1050, 220)">
          <circle cx="0" cy="0" r="16" fill="#0a0a08" />
          <circle cx="0" cy="0" r="6" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

export default function NearbyMasjidFinder() {
  const [masjids, setMasjids] = useState([]);
  const [activeMosqueId, setActiveMosqueId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [statusMsg, setStatusMsg] = useState('Fetching live mosques from ConnectMasjid server...');
  const [lastUpdated, setLastUpdated] = useState('');
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedPrayer, setSelectedPrayer] = useState('fajr');
  const [widgetAdded, setWidgetAdded] = useState(false);
  const [likedMosques, setLikedMosques] = useState(() => {
    try {
      const saved = localStorage.getItem('cm_liked_mosques');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cm_liked_mosques', JSON.stringify(likedMosques));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [likedMosques]);

  const handleAddWidget = async () => {
    if (!activeMasjid) return;

    try {
      const existing = localStorage.getItem('cm_cached_mosques');
      let currentList = existing ? JSON.parse(existing) : [];
      if (!Array.isArray(currentList)) currentList = [];
      const updatedList = [activeMasjid, ...currentList.filter(m => m.id !== activeMasjid.id)];
      localStorage.setItem('cm_cached_mosques', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to update widget cache in localStorage:', e);
    }

    if ('Notification' in window && Notification.permission !== 'granted') {
      try {
        await Notification.requestPermission();
      } catch (e) { /* ignore */ }
    }

    window.dispatchEvent(new CustomEvent('cm_add_widget', { detail: activeMasjid }));

    setWidgetAdded(true);
    setTimeout(() => setWidgetAdded(false), 2500);
  };

  const dateList = generateDates();

  /* ── 1. Fetch Top 3 Mosques from /api/mosques with LocalStorage Cache ── */
  const fetchAllMosques = useCallback(async () => {
    // Load cached data instantly first (0ms lag on reload)
    try {
      const cached = localStorage.getItem('cm_cached_mosques');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const top3 = parsed.slice(0, 3);
          setMasjids(top3);
          setActiveMosqueId(top3[0].id);
          setLoading(false);
        }
      }
    } catch (e) { /* ignore cache read error */ }

    // Fetch fresh live data from ConnectMasjid server
    setStatusMsg('Connecting to live ConnectMasjid database...');
    try {
      const res = await fetch(`${API_BASE_URL}/mosques`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const resData = await res.json();

      if (resData.status === 'SUCCESS' && Array.isArray(resData.data)) {
        const top3 = resData.data.slice(0, 3);
        setMasjids(top3);
        setActiveMosqueId((prev) => prev || top3[0]?.id);
        
        // Store fresh copy in LocalStorage Cache
        localStorage.setItem('cm_cached_mosques', JSON.stringify(top3));
        setStatusMsg(`Displaying top 3 nearest verified mosques`);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } else {
        setStatusMsg('No mosque records returned from server');
      }
    } catch (err) {
      console.error('Error loading live mosques:', err);
      setStatusMsg('Showing cached mosque timings (offline mode)');
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── 2. Search Mosques via /api/mosques/search?q=... ── */
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchAllMosques();
      return;
    }

    setLoading(true);
    setStatusMsg(`Searching live mosques for "${query}"...`);

    try {
      const res = await fetch(`${API_BASE_URL}/mosques/search?q=${encodeURIComponent(query.trim())}`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const resData = await res.json();

      if (resData.status === 'SUCCESS' && Array.isArray(resData.data)) {
        const top3 = resData.data.slice(0, 3);
        setMasjids(top3);
        if (top3.length > 0) {
          setActiveMosqueId(top3[0].id);
        }
        setStatusMsg(`Showing top 3 mosques matching "${query}"`);
      } else {
        setMasjids([]);
        setStatusMsg(`No mosques found matching "${query}"`);
      }
    } catch (err) {
      console.error('Search error:', err);
      setStatusMsg('Search request failed');
    } finally {
      setLoading(false);
    }
  };

  /* ── 3. Fetch Top 3 Nearby via /api/mosques/nearby?lat=...&lng=... ── */
  const requestNearbyGPS = () => {
    if (!navigator.geolocation) {
      setStatusMsg('Geolocation not supported by browser');
      return;
    }

    setLoading(true);
    setStatusMsg('Accessing GPS coordinates securely...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = parseFloat(pos.coords.latitude.toFixed(5));
        const lng = parseFloat(pos.coords.longitude.toFixed(5));
        setUserLocation({ lat, lng });

        setStatusMsg(`Fetching nearest 3 mosques to your location...`);

        try {
          const res = await fetch(`${API_BASE_URL}/mosques/nearby?lat=${lat}&lng=${lng}`, {
            headers: { Accept: 'application/json' },
          });

          if (res.ok) {
            const resData = await res.json();
            if (resData.status === 'SUCCESS' && Array.isArray(resData.data) && resData.data.length > 0) {
              const top3 = resData.data.slice(0, 3);
              setMasjids(top3);
              setActiveMosqueId(top3[0].id);
              setStatusMsg(`Found 3 nearest mosques to your GPS location`);
              setLoading(false);
              setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
              return;
            }
          }
        } catch (e) {
          // Fallback to sorting all mosques by distance
        }

        if (masjids.length > 0) {
          const sorted = [...masjids]
            .sort((a, b) => {
              const distA = calcDistance(lat, lng, a.latitude, a.longitude) || 999;
              const distB = calcDistance(lat, lng, b.latitude, b.longitude) || 999;
              return distA - distB;
            })
            .slice(0, 3);
          setMasjids(sorted);
          if (sorted.length > 0) setActiveMosqueId(sorted[0].id);
          setStatusMsg(`Displaying top 3 nearest mosques by GPS distance`);
        }

        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      },
      (err) => {
        setLoading(false);
        setStatusMsg('Location permission denied or unavailable');
      },
      { timeout: 8000 }
    );
  };

  /* Initial load */
  useEffect(() => {
    fetchAllMosques();
  }, [fetchAllMosques]);

  const activeMasjid = masjids.find((m) => m.id === activeMosqueId) || masjids[0];

  return (
    <section className="nearby-section" id="nearby-masjids" aria-label="Live Verified Mosques and Prayer Schedules">
      {/* Fake Map Tile Graphic Background UI */}
      <VectorMapTilesBackground />
      <div className="nearby-map-overlay" aria-hidden="true" />

      <div className="nearby-container">

        {/* Section Header */}
        <div className="nearby-header">
          <h2 className="nearby-title">
            Nearby Masjids
          </h2>

          {/* Search & Location Bar */}
          <div className="nearby-action-bar">
            {/* Live Search Input */}
            <div className="nearby-search-box">
              <Search size={18} color="#7a7a72" />
              <input
                type="text"
                placeholder="Search by mosque name or city (e.g. Hadapsar, Pune)..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="nearby-search-input"
              />
            </div>

            {/* GPS Nearby Button */}
            <button
              className="nearby-loc-btn"
              onClick={requestNearbyGPS}
              disabled={loading}
              aria-label="Find Nearby Mosques"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="spin-icon" />
                  Loading...
                </>
              ) : (
                <>
                  <MapPin size={16} />
                  Find Near Me
                </>
              )}
            </button>

            {/* Refresh Button */}
            <button
              className="nearby-refresh-btn"
              onClick={fetchAllMosques}
              title="Refresh Live Data"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? 'spin-icon' : ''} />
            </button>
          </div>

          {/* Status Bar */}
          {statusMsg && (
            <div className="nearby-status-text status-success">
              <CheckCircle2 size={13} color="#00b83b" /> {statusMsg}
            </div>
          )}
        </div>

        {/* ── Main Dynamic Grid ── */}
        {loading && masjids.length === 0 ? (
          <div className="nearby-loading-placeholder">
            <RefreshCw size={32} className="spin-icon" color="#00b83b" />
            <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>Fetching live mosques from ConnectMasjid server...</p>
            <span style={{ fontSize: '0.85rem', color: '#888' }}>{API_BASE_URL}/mosques</span>
          </div>
        ) : masjids.length > 0 ? (
          <div className="nearby-grid">

            {/* Left Column: List of Live Mosques */}
            <div className="nearby-list-col">
              <div className="nearby-list-header">
                <span className="nearby-list-count">{masjids.length} Live Mosques</span>
                {lastUpdated && <span className="nearby-list-updated">Synced {lastUpdated}</span>}
              </div>

              <div className="nearby-cards-stack">
                {masjids.map((m) => {
                  const dist = userLocation
                    ? calcDistance(userLocation.lat, userLocation.lng, m.latitude, m.longitude)
                    : null;

                  return (
                    <div
                      key={m.id}
                      className={`nearby-item-card ${activeMosqueId === m.id ? 'active' : ''}`}
                      onClick={() => setActiveMosqueId(m.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="item-card-top">
                        <h3 className="item-card-name">{sanitizeText(m.name)}</h3>
                        {dist !== null && (
                          <span className="item-card-dist">{dist} km away</span>
                        )}
                      </div>

                      <div className="item-card-sub">
                        <MapPin size={13} className="inline-icon" />
                        <span>
                          {sanitizeText(m.address_line_1 || m.address || m.city)}
                          {m.city ? `, ${sanitizeText(m.city)}` : ''}
                        </span>
                        {m.is_verified === 1 && (
                          <span className="verified-pill">
                            <ShieldCheck size={11} /> Verified Live
                          </span>
                        )}
                      </div>

                      {/* Live Prayer Timings Pills */}
                      <div className="item-quick-timings">
                        <span>Fajr {formatTime(m.fajr_jamaat)}</span>
                        <span>Dhuhr {formatTime(m.dhuhr_jamaat)}</span>
                        <span>Asr {formatTime(m.asr_jamaat)}</span>
                        <span>Maghrib {formatTime(m.maghrib_jamaat)}</span>
                        <span>Isha {formatTime(m.isha_jamaat)}</span>
                      </div>

                      {/* Live Stats Footnote */}
                      {(m.connected_count > 0 || m.likes_count > 0) && (
                        <div className="item-stats-row">
                          {m.connected_count > 0 && (
                            <span className="stat-pill">
                              <Users size={12} /> {m.connected_count} Connected Worshippers
                            </span>
                          )}
                          {m.likes_count > 0 && (
                            <span className="stat-pill">
                              <Heart size={12} color="#ef4444" fill="#ef4444" /> {m.likes_count} Likes
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Screenshot Replica Prayer Timing Card */}
            {activeMasjid && (
              <div className="nearby-detail-col">
                <div className="pj-card">
                  {/* Top Header: Title + Circular Heart Like Button */}
                  <div className="pj-header-row">
                    <h2 className="pj-title">{sanitizeText(activeMasjid.name)}</h2>
                    <button
                      className={`pj-heart-btn ${likedMosques[activeMasjid.id] ? 'liked' : ''}`}
                      onClick={() =>
                        setLikedMosques((prev) => ({
                          ...prev,
                          [activeMasjid.id]: !prev[activeMasjid.id],
                        }))
                      }
                      aria-label="Like Mosque"
                    >
                      <Heart
                        size={22}
                        color={likedMosques[activeMasjid.id] ? '#ef4444' : '#9a9a94'}
                        fill={likedMosques[activeMasjid.id] ? '#ef4444' : 'none'}
                      />
                    </button>
                  </div>

                  {/* Subtitle Full Detailed Address */}
                  <p className="pj-address">
                    {sanitizeText(buildFullAddress(activeMasjid))}
                  </p>

                  {/* Prayer Timing Bars */}
                  <div className="pj-timings-list">
                    {[
                      { key: 'fajr', label: 'Fajr', val: activeMasjid.fajr_jamaat },
                      { key: 'dhuhr', label: 'Dhuhr', val: activeMasjid.dhuhr_jamaat },
                      { key: 'asr', label: 'Asr', val: activeMasjid.asr_jamaat },
                      { key: 'maghrib', label: 'Maghrib', val: activeMasjid.maghrib_jamaat },
                      { key: 'isha', label: 'Isha', val: activeMasjid.isha_jamaat },
                      ...(activeMasjid.jumuah_jamaat ? [{ key: 'jumuah', label: 'Jumu\'ah', val: activeMasjid.jumuah_jamaat }] : []),
                    ].map((p) => {
                      const isSelected = selectedPrayer === p.key;
                      return (
                        <div
                          key={p.key}
                          className={`pj-timing-bar ${isSelected ? 'active-black' : ''}`}
                          onClick={() => setSelectedPrayer(p.key)}
                          role="button"
                          tabIndex={0}
                        >
                          <span className="pj-prayer-name">{p.label}</span>
                          <span className="pj-prayer-time">{formatPrayerTime(p.val)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add Live Timing Widget Button — Standalone element below the timing card */}
                <button
                  className={`pj-add-widget-btn external ${widgetAdded ? 'added' : ''}`}
                  onClick={handleAddWidget}
                  title="Add live prayer widget & enable Adhan alerts"
                >
                  {widgetAdded ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Widget Added to Screen ✓</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle size={18} />
                      <span>Add Live Timing Widget</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        ) : (
          <div className="nearby-loading-placeholder">
            <p style={{ fontWeight: 700, color: '#dc2626' }}>No mosque records found in database.</p>
          </div>
        )}

      </div>
    </section>
  );
}
