import React from 'react';
import { ShieldCheck, Cloud, Map, Mail, Lock, CheckCircle } from 'lucide-react';

export default function PartnerTicker() {
  const partners = [
    { name: 'Google Play Services', desc: 'System Core', icon: Cloud },
    { name: 'Firebase Cloud Messaging', desc: 'Real-Time Adhan Alerts', icon: ShieldCheck },
    { name: 'Brevo (Sendinblue)', desc: 'Secure OTP Auth', icon: Mail },
    { name: 'OpenStreetMap & CartoDB', desc: 'Precise Mosque Locator', icon: Map },
    { name: 'TLS 1.3 Encryption', desc: 'Zero Data Leakage', icon: Lock },
    { name: 'Verified Community Masjids', desc: '100% Authentic Schedules', icon: CheckCircle }
  ];

  return (
    <section className="ticker-section">
      <div className="container">
        <div className="ticker-track">
          {partners.map((partner, i) => {
            const Icon = partner.icon;
            return (
              <div key={i} className="ticker-item">
                <Icon size={18} color="#10b981" />
                <span>{partner.name}</span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                  ({partner.desc})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
