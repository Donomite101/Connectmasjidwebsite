import React from 'react';
import { Clock, Bell, ShieldCheck, MapPin, Users, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Clock,
      tag: 'LIVE TIMINGS',
      title: 'Connect With Your Masjid',
      desc: 'Connect directly with your local masjid and get live, verified daily Jamaat times instantly synced to your device.',
      stat: 'Instant Jamaat Sync'
    },
    {
      icon: Bell,
      tag: 'INSTANT ALERTS',
      title: 'Real-Time Adhan & Alerts',
      desc: 'Receive instant Adhan reminders, Friday (Jumuah) announcements, and important community notices directly on your mobile device.',
      stat: 'Instant Push Notifications'
    },
    {
      icon: ShieldCheck,
      tag: 'ADMIN VERIFIED',
      title: 'Mosque Admin Verification',
      desc: 'Ensures complete authenticity by verifying registered mosque administrators through secure verification codes to prevent unauthorized changes.',
      stat: '100% Verified Admins'
    },
    {
      icon: Compass,
      tag: 'PRECISION QIBLA',
      title: 'Precise Qibla & Distance',
      desc: 'Automatically detects nearby masjids, calculates accurate Qibla direction, and displays precise prayer times for your exact location.',
      stat: 'Exact Bearing & Compass'
    },
    {
      icon: Users,
      tag: 'COMMUNITY FIRST',
      title: 'Community Connection',
      desc: 'Allows community members to join, follow, and interact with their registered masjids in a clean, distraction-free environment.',
      stat: 'Zero Clutter'
    },
    {
      icon: MapPin,
      tag: 'SECURE DATA',
      title: '100% Privacy Protected',
      desc: 'Your personal data and location stay strictly confidential with enterprise-grade security protocols protecting every connection.',
      stat: 'End-to-End Encrypted'
    }
  ];

  return (
    <section className="what-you-can-section">
      {/* Shifted toward left with prominent styling */}
      <div className="features-header-left">
        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
          <h2 className="nib-heading" style={{ whiteSpace: 'nowrap' }}>What Our App</h2>
          <span className="nib-heading-script" style={{ whiteSpace: 'nowrap', marginLeft: '12px' }}>Has</span>
        </div>
        <p className="features-subtitle-left">
          Discover professional features engineered specifically for modern masjid congregations and administrators.
        </p>
      </div>

      <div className="nib-feature-grid">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={idx} className="nib-card animated-feature-card">
              {/* Top Row: Icon + Feature Tag Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <div className="feature-icon-box">
                  <Icon size={22} color="#111315" className="feature-icon-svg" />
                </div>
                <span className="feature-tag-pill">{feat.tag}</span>
              </div>

              {/* Title & Description */}
              <h3 className="feature-card-title">
                {feat.title}
              </h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '24px', flexGrow: 1 }}>
                {feat.desc}
              </p>

              {/* Bottom Stat Detail Strip */}
              <div className="feature-card-footer">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#2b3137' }}>
                  <CheckCircle2 size={14} color="#4eb00a" /> {feat.stat}
                </span>
                <div className="feature-arrow-indicator">
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
