import React from 'react';
import {
  Clock,
  Bell,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  ArrowUpRight,
  MapPin
} from 'lucide-react';

export default function BentoFeatures({ onExploreMore }) {
  return (
    <section className="bento-section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="badge-pill accent">
            <span>Powered by ConnectMasjid Ecosystem</span>
          </span>
          <h2>
            Everything your Mosque & Community needs in one digital home
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Built for Muslims and Mosque Administrators with uncompromising reliability, privacy, and real-time synchronization.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Dark Hero Bento */}
          <div className="bento-card hero-bento">
            <div>
              <div className="icon-wrapper">
                <Building2 size={26} />
              </div>
              <span
                style={{
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#10b981',
                  fontWeight: 700
                }}
              >
                MOSQUE MANAGEMENT SOFTWARE
              </span>
              <h3 style={{ marginTop: '12px', marginBottom: '16px' }}>
                Mosque administration that handles it all.
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '1.02rem', maxWidth: '420px', lineHeight: 1.6 }}>
                Empower your mosque with seamless Jamaat schedule updates, live community feeds, verified admin roles, and real-time congregation notices.
              </p>
            </div>

            <div style={{ marginTop: '36px' }}>
              <button
                onClick={onExploreMore}
                className="btn btn-accent"
                style={{ padding: '12px 24px', fontSize: '0.9rem' }}
              >
                <span>SEE ALL FEATURES</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          {/* Card 2: Prayer & Jamaat Timings */}
          <div className="bento-card small-bento">
            <div>
              <div className="icon-wrapper">
                <Clock size={26} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
                Accurate Prayer & Jamaat Sync
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
                Astronomical calculations and exact geographical coordinates (latitude & longitude) combined with real-time Jamaat times updated directly by your local mosque administrators.
              </p>
            </div>

            <div
              style={{
                marginTop: '24px',
                padding: '14px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Primary Mosque Sync</span>
              <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>100% Accurate</span>
            </div>
          </div>

          {/* Card 3: Real-time Notifications */}
          <div className="bento-card medium-bento">
            <div>
              <div className="icon-wrapper">
                <Bell size={26} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>
                Live Adhan & Community Alerts
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Never miss Friday (Jumuah) announcements, Eid moonsighting updates, or urgent community alerts powered by Google Firebase Cloud Messaging.
              </p>
            </div>
          </div>

          {/* Card 4: Secure Verification & OTP */}
          <div className="bento-card medium-bento">
            <div>
              <div className="icon-wrapper">
                <ShieldCheck size={26} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>
                Secure Admin Verification
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Verifies every mosque administrator via Brevo (Sendinblue) OTP to guarantee that schedule changes and notices come exclusively from official leaders.
              </p>
            </div>
          </div>

          {/* Card 5: Precise Qibla & Community Feed */}
          <div className="bento-card medium-bento">
            <div>
              <div className="icon-wrapper">
                <Compass size={26} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>
                Qibla & Distance Calculation
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Uses OpenStreetMap & CartoDB map tiles to compute exact Qibla direction and walk/drive distances between your location and nearby masjids.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
