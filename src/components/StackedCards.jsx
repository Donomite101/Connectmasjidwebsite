import React from 'react';
import './StackedCards.css';

const CARDS = [
  {
    num: '01',
    stepTag: 'Step 01 • Find Your Masjid',
    title: 'Find Your Masjid',
    desc: 'Search thousands of verified masjids near you. Filter by distance, prayer schedule, facilities, and more.',
    giantDisplay: '01',
    themeColor: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    giantTextColor: 'rgba(255, 255, 255, 0.18)',
  },
  {
    num: '02',
    stepTag: 'Step 02 • Get Live Timings',
    title: 'Get Live Prayer Times',
    desc: 'Real-time Jamaat schedules synced directly from mosque administrators. Always accurate, always on time.',
    giantDisplay: '02',
    themeColor: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    giantTextColor: 'rgba(255, 255, 255, 0.18)',
  },
  {
    num: '03',
    stepTag: 'Step 03 • Real-Time Alerts',
    title: 'Receive Announcements',
    desc: 'Instant push notifications for Adhan, Friday Khutbah, special programs, and urgent community updates.',
    giantDisplay: '03',
    themeColor: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    giantTextColor: 'rgba(255, 255, 255, 0.18)',
  },
  {
    num: '04',
    stepTag: 'Step 04 • Stay Connected',
    title: 'Stay Connected',
    desc: 'Build a stronger bond with your masjid community. Prayer after prayer, day after day, year after year.',
    giantDisplay: '04',
    themeColor: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    giantTextColor: 'rgba(255, 255, 255, 0.18)',
  },
];

export default function StackedCards() {
  return (
    <section
      className="stacked-section-smooth"
      id="how-it-works"
      aria-label="How ConnectMasjid works"
    >
      <div className="stacked-section-header">
        <div className="stacked-eyebrow">How It Works</div>
        <h2 className="stacked-heading">
          From Adhan to<br />Announcement.<br />In Seconds.
        </h2>
      </div>

      <div className="stacked-sticky-container">
        {CARDS.map((card, index) => (
          <div
            key={card.num}
            className="stack-card-sticky-item"
            style={{
              background: card.themeColor,
              top: `calc(110px + ${index * 36}px)`,
              zIndex: index + 1,
            }}
          >
            <div className="stack-card-inner">
              <span className="stack-pill-tag">{card.stepTag}</span>

              <div className="stack-card-content">
                <h3 className="stack-card-title-text">{card.title}</h3>
                <p className="stack-card-description">{card.desc}</p>
              </div>
            </div>

            <div
              className="stack-giant-display"
              style={{ color: card.giantTextColor }}
            >
              {card.giantDisplay}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
