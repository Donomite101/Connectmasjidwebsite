import React, { useState } from 'react';
import { Check, ShieldCheck, MapPin, Bell, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FeatureSpotlight({ onRegisterMasjid }) {
  const [selectedCity, setSelectedCity] = useState('New York');

  const citymasjids = {
    'New York': {
      mosque: 'Islamic Cultural Center of NYC',
      fajr: '04:55 AM',
      asr: '05:20 PM',
      maghrib: '08:14 PM',
      jamaatStatus: 'Updated 5m ago'
    },
    'London': {
      mosque: 'East London Mosque',
      fajr: '03:42 AM',
      asr: '05:35 PM',
      maghrib: '09:12 PM',
      jamaatStatus: 'Updated 1m ago'
    },
    'Toronto': {
      mosque: 'Jami Mosque Toronto',
      fajr: '04:48 AM',
      asr: '05:25 PM',
      maghrib: '08:48 PM',
      jamaatStatus: 'Updated 10m ago'
    }
  };

  const activeData = citymasjids[selectedCity];

  return (
    <section className="spotlight-section">
      <div className="container">
        {/* Spotlight Row 1 */}
        <div className="spotlight-row">
          {/* Interactive Card Preview */}
          <div className="spotlight-preview-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  LIVE SCHEDULE FEED
                </span>
                <h4 style={{ fontSize: '1.2rem' }}>My Primary Mosque</h4>
              </div>
              <span className="badge-pill accent" style={{ fontSize: '0.78rem' }}>
                Active Sync
              </span>
            </div>

            {/* Simulated interactive Card UI */}
            <div
              style={{
                background: '#0f172a',
                borderRadius: '16px',
                padding: '24px',
                color: 'white',
                marginBottom: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>{activeData.mosque}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{activeData.jamaatStatus}</div>
                </div>
                <div style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', fontWeight: 700, fontSize: '0.82rem' }}>
                  VERIFIED
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Fajr Jamaat</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{activeData.fajr}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Asr Jamaat</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10b981' }}>{activeData.asr}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Maghrib Jamaat</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{activeData.maghrib}</div>
                </div>
              </div>
            </div>

            {/* City Selector */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Try Location:</span>
              {Object.keys(citymasjids).map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    background: selectedCity === city ? '#10b981' : '#f1f5f9',
                    color: selectedCity === city ? 'white' : '#334155',
                    cursor: 'pointer'
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Text description matching Cortexa layout */}
          <div>
            <span className="badge-pill">Unified Mosque Dashboard</span>
            <h2 style={{ fontSize: '2.4rem', margin: '16px 0 20px', lineHeight: 1.2 }}>
              Manage your entire mosque & prayer schedules in one place
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', marginBottom: '24px' }}>
              Centralize and simplify congregation schedules, Friday announcements, and facility updates. Community members automatically see real-time changes based on their exact coordinates.
            </p>

            <ul className="check-list">
              <li>
                <div className="check-icon">
                  <Check size={14} />
                </div>
                <span>No hardware or training needed for mosque admins</span>
              </li>
              <li>
                <div className="check-icon">
                  <Check size={14} />
                </div>
                <span>100% encrypted & privacy verified (HTTPS / TLS 1.3)</span>
              </li>
              <li>
                <div className="check-icon">
                  <Check size={14} />
                </div>
                <span>Automated nightly data maintenance & OTP protection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Spotlight Row 2 */}
        <div className="spotlight-row reverse" style={{ marginTop: '100px' }}>
          <div>
            <span className="badge-pill">Community First Platform</span>
            <h2 style={{ fontSize: '2.4rem', margin: '16px 0 20px', lineHeight: 1.2 }}>
              Keep your community connected, on time every prayer
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', marginBottom: '28px' }}>
              Whether at home, at work, or traveling, ConnectMasjid ensures Musallas always know accurate local Jamaat times and mosque news without checking messy group chats.
            </p>

            <button
              onClick={onRegisterMasjid}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '0.98rem' }}
            >
              <span>Onboard Your Mosque Today</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Interactive Card Preview 2 */}
          <div className="spotlight-preview-card" style={{ background: '#090d16', color: 'white', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={22} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Instant Push Notifications</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Powered by Google Firebase Cloud Messaging</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>ADHAN REMINDER</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Just now</span>
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 600 }}>Asr Adhan at your Primary Mosque</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600 }}>JAMAAT ALERT</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>15 mins before</span>
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: 600 }}>Asr Jamaat begins in 15 minutes at Masjid Al-Noor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
