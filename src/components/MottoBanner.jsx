import React from 'react';

export default function MottoBanner() {
  return (
    <section className="motto-banner-section" aria-label="Jaha Masjid Waha ConnectMasjid">
      <div className="motto-banner-container">
        {/* Giant Jitter Replica Display Quote */}
        <h2 className="motto-banner-quote">
          &ldquo;Jaha Masjid Waha{' '}
          <span className="motto-accent-word">ConnectMasjid</span>.&rdquo;
        </h2>

        {/* Deliveroo-Style Brand Card Below */}
        <div className="motto-brand-card">
          <img
            src="/applogo.jpeg"
            alt="ConnectMasjid Logo"
            className="motto-card-logo"
          />
          <div className="motto-card-info">
            <div className="motto-card-title">ConnectMasjid</div>
            <div className="motto-card-subtitle">Community Platform for Every Masjid</div>
          </div>
        </div>
      </div>
    </section>
  );
}
