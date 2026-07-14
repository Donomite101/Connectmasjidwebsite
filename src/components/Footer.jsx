import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="minimal-footer">
      <div className="footer-inner">
        {/* Brand */}
        <div style={{ maxWidth: '340px' }}>
          <button
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="brand-heading"
            style={{ marginBottom: '14px', display: 'block', color: '#166534', fontSize: '1.1rem' }}
          >
            ConnectMasjid
          </button>
          <p style={{ color: '#111315', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 500 }}>
            Community-first platform connecting Muslims with their local masjids. Accurate prayer timings, Jamaat schedules, and verified mosque administration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '14px', color: 'var(--text-black)' }}>Navigation</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
            <li>
              <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Privacy Policy & Documentation
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Terms & Conditions
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '14px', color: 'var(--text-black)' }}>ConnectMasjid Support</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li>
              <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>Email Support: </span>
              <a href="mailto:support@connectmasjid.com" style={{ fontWeight: 600, color: 'var(--text-black)' }}>
                support@connectmasjid.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div>© 2026 ConnectMasjid. Effective Date: July 13, 2026. All rights reserved.</div>
      </div>
    </footer>
  );
}
