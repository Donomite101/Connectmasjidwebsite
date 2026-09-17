import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const go = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      {/* ── Big dark CTA block ── */}
      <div
        className="footer-cta-block"
        id="cta-section"
        aria-label="Get started call to action"
      >
        <div className="footer-cta-glow"   aria-hidden="true" />
        <div className="footer-cta-decor-1" aria-hidden="true" />
        <div className="footer-cta-decor-2" aria-hidden="true" />

        <div className="footer-cta-eyebrow">Get Started Today</div>
        <h2 className="footer-cta-title">
          Connect Your<br />Masjid Now
        </h2>
        <p className="footer-cta-sub">
          Join hundreds of masjids already using ConnectMasjid to strengthen
          their community, one prayer at a time.
        </p>
        <div className="footer-cta-actions">
          <button
            id="footer-signup-btn"
            className="btn-cta-green"
            onClick={() => go('auth')}
          >
            Sign In / Sign Up
            <ArrowUpRight size={16} />
          </button>
          <button
            id="footer-contact-btn"
            className="btn-cta-outline"
            onClick={() => go('contact')}
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* ── Minimal footer ── */}
      <div className="minimal-footer-v2">
        <div className="footer-inner-grid">
          {/* Brand column */}
          <div>
            <div className="footer-brand-row">
              <img
                src="/applogo.jpeg"
                alt="ConnectMasjid"
                className="footer-logo-img"
              />
              <span className="footer-brand-txt">ConnectMasjid</span>
            </div>
            <p className="footer-desc-v2">
              Community-first platform connecting Muslims with their local
              masjids. Accurate prayer timings, Jamaat schedules, and verified
              mosque administration — all in one app.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <div className="footer-col-label">Navigation</div>
            <ul className="footer-link-list">
              {[
                ['home',           'Home'],
                ['privacy',        'Privacy Policy'],
                ['terms',          'Terms & Conditions'],
                ['delete-account', 'Account Deletion'],
                ['contact',        'Contact Us'],
              ].map(([tab, label]) => (
                <li key={tab}>
                  <button id={`footer-nav-${tab}`} onClick={() => go(tab)}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <div className="footer-col-label">Support</div>
            <ul className="footer-link-list">
              <li>
                <a
                  href="mailto:support.connectmasjid@gmail.com"
                  aria-label="Email ConnectMasjid support"
                >
                  <Mail size={13} />
                  support.connectmasjid@gmail.com
                </a>
              </li>
              <li>
                <button
                  id="footer-auth-btn"
                  onClick={() => go('auth')}
                >
                  Member Login
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-v2">
            © 2026 ConnectMasjid. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <button id="footer-bottom-privacy" onClick={() => go('privacy')}>
              Privacy Policy
            </button>
            <button id="footer-bottom-terms" onClick={() => go('terms')}>
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
