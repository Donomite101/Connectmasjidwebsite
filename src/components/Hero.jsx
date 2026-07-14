import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Hero({ onExplore }) {
  return (
    <>
      <section className="hero-wrapper">
        {/* Center Diagonal Realistic 3D Mosque Pillar / Tapered Slim Minaret with Golden Crescent Finial */}
        <div className="hero-diagonal-object">
          <svg viewBox="0 0 320 560" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Polished White Marble / Stone 3D Cylinder Shading */}
              <linearGradient id="marbleShaft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="20%" stopColor="#f8fafc" />
                <stop offset="48%" stopColor="#ffffff" />
                <stop offset="78%" stopColor="#e2e8f0" />
                <stop offset="95%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              {/* Darker Marble Fluting Shadow */}
              <linearGradient id="marbleFlute" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#475569" stopOpacity="0.8" />
              </linearGradient>

              {/* Ornate Gold Metallic Capital & Finial */}
              <linearGradient id="goldOrnate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="35%" stopColor="#facc15" />
                <stop offset="65%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#854d0e" />
              </linearGradient>

              {/* Deep Emerald Geometric Inlay */}
              <linearGradient id="emeraldInlay" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="45%" stopColor="#10b981" />
                <stop offset="85%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>

              {/* Specular Gloss Highlight */}
              <linearGradient id="pillarGloss" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="35%" stopColor="white" stopOpacity="0.8" />
                <stop offset="45%" stopColor="white" stopOpacity="0.95" />
                <stop offset="65%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>

              <filter id="pillarShadow" x="-30%" y="-20%" width="160%" height="150%">
                <feDropShadow dx="16" dy="25" stdDeviation="18" floodColor="#090d16" floodOpacity="0.28" />
              </filter>
            </defs>

            {/* Tilted Mosque Architectural Pillar Group */}
            <g filter="url(#pillarShadow)">
              {/* 1. WIDE PILLAR PEDESTAL / BASE (Bottom) */}
              <path d="M 50 535 L 170 535 L 158 495 L 62 495 Z" fill="url(#marbleShaft)" stroke="#64748b" strokeWidth="1.5" />
              <path d="M 64 495 L 156 495 L 150 475 L 70 475 Z" fill="url(#goldOrnate)" />

              {/* 2. LOWER SUBSTANTIAL MARBLE SHAFT */}
              <path d="M 72 475 L 148 475 L 144 315 L 76 315 Z" fill="url(#marbleShaft)" />
              {/* Flutes on Lower Shaft */}
              <line x1="86" y1="475" x2="86" y2="315" stroke="url(#marbleFlute)" strokeWidth="3" />
              <line x1="100" y1="475" x2="100" y2="315" stroke="url(#marbleFlute)" strokeWidth="3.5" />
              <line x1="118" y1="475" x2="118" y2="315" stroke="url(#marbleFlute)" strokeWidth="3" />
              <line x1="134" y1="475" x2="134" y2="315" stroke="url(#marbleFlute)" strokeWidth="3" />
              {/* Gloss */}
              <path d="M 94 475 L 114 475 L 114 315 L 94 315 Z" fill="url(#pillarGloss)" opacity="0.65" />

              {/* 3. MIDDLE ORNATE BALCONY / MUQARNAS TRANSITION COLLAR */}
              <path d="M 68 315 L 152 315 L 160 290 L 60 290 Z" fill="url(#goldOrnate)" />
              <path d="M 60 290 L 160 290 L 150 270 L 70 270 Z" fill="url(#emeraldInlay)" stroke="url(#goldOrnate)" strokeWidth="2" />
              {/* Gold Islamic Arch Reliefs on Collar */}
              <path d="M 70 290 Q 80 278 90 290 Q 100 278 110 290 Q 120 278 130 290 Q 140 278 150 290" fill="none" stroke="#fef08a" strokeWidth="2.5" />

              {/* 4. SLIM / TAPERED UPPER MINARET SHAFT */}
              {/* Notice how it tapers significantly narrower toward the top (from width 76 to width 44) */}
              <path d="M 76 270 L 144 270 L 132 140 L 88 140 Z" fill="url(#marbleShaft)" />
              {/* Flutes on Slim Upper Shaft */}
              <line x1="88" y1="270" x2="96" y2="140" stroke="url(#marbleFlute)" strokeWidth="2.5" />
              <line x1="103" y1="270" x2="106" y2="140" stroke="url(#marbleFlute)" strokeWidth="3" />
              <line x1="117" y1="270" x2="114" y2="140" stroke="url(#marbleFlute)" strokeWidth="3" />
              <line x1="132" y1="270" x2="124" y2="140" stroke="url(#marbleFlute)" strokeWidth="2.5" />
              {/* Specular Gloss on Slim Upper Shaft */}
              <path d="M 98 270 L 114 270 L 112 140 L 100 140 Z" fill="url(#pillarGloss)" opacity="0.75" />

              {/* 5. SLIM UPPER BALCONY / CROWN CAPITAL */}
              <path d="M 82 140 L 138 140 L 144 118 L 76 118 Z" fill="url(#goldOrnate)" />
              <path d="M 78 118 L 142 118 L 132 98 L 88 98 Z" fill="url(#marbleShaft)" stroke="#64748b" strokeWidth="1.5" />

              {/* 6. ARCHITECTURAL DOME & GRAND GOLDEN CRESCENT FINIAL */}
              {/* Emerald Geometric Dome */}
              <path d="M 88 98 Q 110 55 132 98 Z" fill="url(#emeraldInlay)" stroke="url(#goldOrnate)" strokeWidth="2.5" />

              {/* Golden Spire Mast ascending */}
              <line x1="110" y1="70" x2="110" y2="36" stroke="url(#goldOrnate)" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="110" cy="52" r="5" fill="url(#goldOrnate)" />
              <circle cx="110" cy="36" r="3.5" fill="url(#goldOrnate)" />

              {/* Prominent Golden Crescent Moon & Star Crowning the Top */}
              <g transform="translate(108, 6) scale(1.35)">
                {/* Crescent Moon */}
                <path d="M 8 16 C -3 14, -4 0, 7 -2 C -1 3, -1 11, 8 16 Z" fill="url(#goldOrnate)" filter="drop-shadow(0 2px 4px rgba(234, 179, 8, 0.45))" />
                {/* Islamic Star */}
                <polygon points="12,5 13,8 16,8 14,10 15,13 12,11 9,13 10,10 8,8 11,8" fill="url(#goldOrnate)" />
              </g>
            </g>
          </svg>
        </div>

        {/* Top Headline Section */}
        <div className="hero-headline-container">
          <span className="script-top">Digital Platform For</span>

          <h1 className="giant-title">
            Masjid Communities
            <span className="script-bottom">Install & Connect</span>
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p className="hero-subtitle-top">
              A Modern Digital Platform for Muslims & Masjid Administrators
            </p>
          </div>
        </div>

        {/* Bottom Row: Minimal CTA Button Only */}
        <div className="hero-bottom-row">
          <div className="hero-cta-box">
            <button onClick={onExplore} className="btn-neon-pill" style={{ marginBottom: 0 }}>
              <span>EXPLORE MASJID APP</span>
              <div className="btn-circle-icon">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Exactly matching Nibfolio Ticker Divider Strip */}
      <div className="ticker-divider">
        <div className="ticker-grid">
          <div className="ticker-feature-item">
            <span>500+ Verified masjids</span>
          </div>
          <span className="star-symbol">✦</span>
          <div className="ticker-feature-item">
            <span>Live Jamaat Sync</span>
          </div>
          <span className="star-symbol">✦</span>
          <div className="ticker-feature-item">
            <span>TLS 1.3 Secure</span>
          </div>
          <span className="star-symbol">✦</span>
          <div className="ticker-feature-item">
            <span>Global Community</span>
          </div>
        </div>
      </div>
    </>
  );
}
