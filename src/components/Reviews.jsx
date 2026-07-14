import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      name: 'Imam Tariq Rahman',
      role: 'Mosque Board Administrator',
      quote: 'ConnectMasjid has simplified our entire Jamaat announcement process. Our congregation receives schedule changes instantly.',
      mosque: 'Masjid Ameer Hamza'
    },
    {
      name: 'Dr. Ayesha Malik',
      role: 'Community Member',
      quote: 'Having reliable Adhan reminders and knowing the exact Friday Khutbah time before leaving work is a game changer.',
      mosque: 'Jama Masjid'
    },
    {
      name: 'Zaid Al-Mansoor',
      role: 'Youth Program Coordinator',
      quote: 'The clean interface and privacy-first approach gives our community peace of mind. Zero clutter or distractions.',
      mosque: 'Ayesha Masjid'
    }
  ];

  return (
    <section className="review-section">
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
        <h2 className="nib-heading">Loved by</h2>
        <span className="nib-heading-script">masjids & Musallas</span>
      </div>

      <div className="review-grid">
        {reviews.map((rev, i) => (
          <div key={i} className="review-card">
            <div>
              <div style={{ display: 'flex', gap: '3px', color: '#f59e0b', marginBottom: '16px' }}>
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={16} fill="#f59e0b" />
                ))}
              </div>
              <p style={{ color: '#111315', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '24px', fontWeight: 500 }}>
                "{rev.quote}"
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-line)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#111315' }}>{rev.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#6b7280' }}>{rev.role}</div>
              </div>
              <span className="pill-badge" style={{ fontSize: '0.75rem', background: '#f8fafc' }}>
                <ShieldCheck size={12} color="#10b981" /> {rev.mosque}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
