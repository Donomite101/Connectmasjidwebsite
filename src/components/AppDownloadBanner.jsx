import React from 'react';
import { Play, CheckCircle2 } from 'lucide-react';
import './AppDownloadBanner.css';

export default function AppDownloadBanner() {
  return (
    <section className="app-download-section" id="app-download-banner" aria-label="Download ConnectMasjid Mobile App">
      <div className="app-download-card">
        
        {/* Top Header Tagline */}
        <div className="app-download-top-tag">
          <span>PRAY</span> • <span>CONNECT</span> • <span>BELONG</span>
        </div>

        <div className="app-download-grid">
          
          {/* Left Column: Branding, Clean Detailed Illustration & Google Play CTA */}
          <div className="app-download-left">
            <div className="app-download-brand">
              <img src="/applogo.jpeg" alt="ConnectMasjid Logo" className="app-download-logo" />
              <span className="app-download-brand-name">ConnectMasjid</span>
            </div>

            <h2 className="app-download-title">
              Stay Connected <br />
              with Your <span className="green-accent">Masjid</span>
            </h2>

            <p className="app-download-subtitle">
              Prayer times, updates, community and more — all in one app.
            </p>

            {/* Clean Detailed Boy Illustration */}
            <div className="app-download-illustration-box">
              <img 
                src="/boy-illustration.jpg" 
                alt="Young boy sitting on prayer mat using ConnectMasjid app on smartphone" 
                className="app-illustration-img"
                loading="lazy"
              />
            </div>

            <div className="app-download-tagline">
              <span className="tagline-bar" />
              <div>
                <strong>Your Masjid.</strong> <br />
                <span>Closer Than Ever.</span>
              </div>
            </div>

            {/* Install on Google Play Store Button ONLY */}
            <div className="app-download-buttons">
              <a 
                href="https://play.google.com/store/apps/details?id=com.connectmasjid.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="app-store-btn google-play-btn"
                aria-label="Install ConnectMasjid on Google Play Store"
              >
                <div className="btn-icon">
                  <Play size={24} fill="currentColor" color="currentColor" />
                </div>
                <div className="btn-text">
                  <span className="btn-sub">GET IT ON</span>
                  <span className="btn-main">Google Play</span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Realistic Phone Mockup UI */}
          <div className="app-download-right">
            {/* Decorative Green Dots Around Phone */}
            <div className="phone-wrapper">
              <div className="deco-dot dot-1" />
              <div className="deco-dot dot-2" />
              <div className="deco-dot dot-3" />
              <div className="deco-dot dot-4" />
              <div className="deco-dot dot-5" />
              <div className="deco-dot dot-6" />
              <div className="deco-dot dot-7" />
              <div className="deco-dot dot-8" />
              <div className="deco-leaf leaf-1">🌿</div>
              <div className="deco-leaf leaf-2">🌿</div>

              <div className="phone-mockup-frame">
                
                {/* Dynamic Island */}
                <div className="phone-dynamic-island">
                  <div className="phone-camera" />
                </div>

                {/* Simple Green Branded Screen */}
                <div className="phone-screen-green">
                  <div className="phone-screen-glow" />
                  <img src="/applogo.jpeg" alt="ConnectMasjid" className="phone-screen-logo" />
                  <h3 className="phone-screen-appname">ConnectMasjid</h3>
                  <p className="phone-screen-tagline">Your Masjid, Closer Than Ever</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
