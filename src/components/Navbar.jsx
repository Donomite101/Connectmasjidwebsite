import React from 'react';
import { Heart, Bell, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="topbar">
      <div className="topbar-grid">
        {/* Left: Brand Logo + Name */}
        <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <img
              src="/applogo.jpeg"
              alt="ConnectMasjid Logo"
              className="navbar-app-logo"
            />
            <span className="brand-heading">ConnectMasjid</span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav>
          <ul className="topbar-center">
            <li>
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-link-item ${activeTab === 'home' ? 'active' : ''}`}
              >
                HOME
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('privacy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-link-item ${activeTab === 'privacy' ? 'active' : ''}`}
              >
                POLICY
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('terms');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-link-item ${activeTab === 'terms' ? 'active' : ''}`}
              >
                TERMS
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('delete-account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-link-item ${activeTab === 'delete-account' ? 'active' : ''}`}
              >
                DELETION
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-link-item ${activeTab === 'contact' ? 'active' : ''}`}
              >
                CONTACT
              </button>
            </li>
          </ul>
        </nav>

        {/* Right: Actions and Icon dividers exactly like Nibfolio */}
        <div className="topbar-right">
          <button
            onClick={() => {
              setActiveTab('onboarding');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="topbar-action-btn"
          >
            REGISTER MASJID
          </button>
          <button
            onClick={() => {
              setActiveTab('auth');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="topbar-action-btn"
            style={{ background: activeTab === 'auth' ? 'var(--text-black)' : 'transparent', color: activeTab === 'auth' ? 'white' : 'var(--text-black)' }}
          >
            SIGN IN
          </button>
          <button
            onClick={() => {
              setActiveTab('auth');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="icon-btn"
            aria-label="Profile / Sign In"
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
