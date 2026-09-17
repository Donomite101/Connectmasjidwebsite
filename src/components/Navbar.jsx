import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar({ activeTab, setActiveTab, openAuthModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const navRef = useRef(null);
  const leaveTimerRef = useRef(null);

  /* Entrance animation */
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -72,
      opacity: 0,
      scale: 0.94,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.15,
      clearProps: 'transform,opacity',
    });
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setMegaOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setMegaOpen(false);
    }, 200);
  };

  const go = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
    setMegaOpen(false);
  };

  const scrollToSection = (sectionId) => {
    setMegaOpen(false);
    setMenuOpen(false);

    const doScroll = () => {
      if (sectionId === 'home' || sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
        const navOffset = 105; // Clearance for fixed 84px header + floating gap
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = Math.max(0, elementPosition - navOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    };

    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(doScroll, 150);
    } else {
      doScroll();
    }
  };

  return (
    <header
      ref={navRef}
      className={`nav-float-wrapper ${scrolled ? 'nav-scrolled' : ''}`}
      role="banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className={`nav-pill ${megaOpen ? 'nav-mega-active' : ''}`} aria-label="Main navigation">
        {/* Logo */}
        <button
          id="nav-logo-btn"
          className="nav-logo"
          onClick={() => go('home')}
          aria-label="ConnectMasjid Home"
        >
          <img
            src="/applogo.jpeg"
            alt="ConnectMasjid Logo"
            className="nav-logo-img"
          />
          <span className="nav-logo-text">ConnectMasjid</span>
        </button>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          <li key="home">
            <button
              id="nav-link-home"
              onClick={() => go('home')}
              className={`nav-link ${activeTab === 'home' ? 'nav-active' : ''}`}
            >
              Home
            </button>
          </li>
          <li key="features">
            <button
              id="nav-link-features"
              onClick={() => scrollToSection('features')}
              className="nav-link"
            >
              Features
            </button>
          </li>
          <li key="reviews">
            <button
              id="nav-link-reviews"
              onClick={() => scrollToSection('reviews')}
              className="nav-link"
            >
              Reviews
            </button>
          </li>
          <li key="privacy">
            <button
              id="nav-link-privacy"
              onClick={() => go('privacy')}
              className={`nav-link ${activeTab === 'privacy' ? 'nav-active' : ''}`}
            >
              Privacy
            </button>
          </li>
          <li key="terms">
            <button
              id="nav-link-terms"
              onClick={() => go('terms')}
              className={`nav-link ${activeTab === 'terms' ? 'nav-active' : ''}`}
            >
              Terms
            </button>
          </li>
          <li key="contact">
            <button
              id="nav-link-contact"
              onClick={() => go('contact')}
              className={`nav-link ${activeTab === 'contact' ? 'nav-active' : ''}`}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Right actions */}
        <div className="nav-cta-group">
          <button
            id="nav-signup-btn"
            className="nav-cta-btn"
            onClick={() => go('auth')}
          >
            Sign Up for Free →
          </button>
          <button
            id="nav-hamburger-btn"
            className="nav-hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Jitter-style Expanded Mega Menu Dropdown */}
      {megaOpen && (
        <div
          className="nav-mega-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="mega-container">
            {/* Left 2x2 Grid of Vibrant Cards linking to Homepage Sections */}
            <div className="mega-cards-grid">
              {/* Card 1 - Vibrant Blue -> Scrolls to Features */}
              <div
                className="mega-card mega-card-blue"
                onClick={() => scrollToSection('features')}
                role="button"
                tabIndex={0}
              >
                <div className="mega-card-body">
                  <h3 className="mega-card-title">Real-time<br />Jamaat Sync</h3>
                  <span className="mega-card-link">Explore Features <ArrowRight size={15} /></span>
                </div>
              </div>

              {/* Card 2 - Soft Grey -> Scrolls to How It Works */}
              <div
                className="mega-card mega-card-grey"
                onClick={() => scrollToSection('how-it-works')}
                role="button"
                tabIndex={0}
              >
                <div className="mega-card-body">
                  <h3 className="mega-card-title">How ConnectMasjid<br />Works</h3>
                  <span className="mega-card-link">See Workflow <ArrowRight size={15} /></span>
                </div>
              </div>

              {/* Card 3 - Vibrant Purple -> Scrolls to Testimonials */}
              <div
                className="mega-card mega-card-purple"
                onClick={() => scrollToSection('reviews')}
                role="button"
                tabIndex={0}
              >
                <div className="mega-card-body">
                  <h3 className="mega-card-title">Community<br />Testimonials</h3>
                  <span className="mega-card-link">Read Reviews <ArrowRight size={15} /></span>
                </div>
              </div>

              {/* Card 4 - Soft Grey -> Opens Auth Page */}
              <div
                className="mega-card mega-card-grey"
                onClick={() => go('auth')}
                role="button"
                tabIndex={0}
              >
                <div className="mega-card-body">
                  <h3 className="mega-card-title">Member<br />Portal</h3>
                  <span className="mega-card-link">Sign In Now <ArrowRight size={15} /></span>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Homepage Navigation */}
            <div className="mega-right-col">
              <h4 className="mega-news-heading">Quick Navigation</h4>
              <ul className="mega-news-list">
                <li
                  className="mega-news-item"
                  onClick={() => scrollToSection('features')}
                >
                  Accurate Prayer & Notice Board Grid
                </li>
                <li
                  className="mega-news-item"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  4-Step Masjid Announcement Flow
                </li>
                <li
                  className="mega-news-item"
                  onClick={() => scrollToSection('reviews')}
                >
                  500+ Verified Pune Masjids & Imams
                </li>
              </ul>
              <button
                className="mega-news-btn"
                onClick={() => go('auth')}
              >
                Sign In / Join Free <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="nav-mobile-menu" id="nav-mobile-menu" role="menu">
          <button
            id="mobile-nav-home"
            onClick={() => go('home')}
            className={`nav-mobile-link ${activeTab === 'home' ? 'nav-active' : ''}`}
            role="menuitem"
          >
            Home
          </button>
          <button
            id="mobile-nav-features"
            onClick={() => scrollToSection('features')}
            className="nav-mobile-link"
            role="menuitem"
          >
            Features
          </button>
          <button
            id="mobile-nav-how-it-works"
            onClick={() => scrollToSection('how-it-works')}
            className="nav-mobile-link"
            role="menuitem"
          >
            How It Works
          </button>
          <button
            id="mobile-nav-reviews"
            onClick={() => scrollToSection('reviews')}
            className="nav-mobile-link"
            role="menuitem"
          >
            Testimonials
          </button>
          <button
            id="mobile-nav-privacy"
            onClick={() => go('privacy')}
            className={`nav-mobile-link ${activeTab === 'privacy' ? 'nav-active' : ''}`}
            role="menuitem"
          >
            Privacy Policy
          </button>
          <button
            id="mobile-nav-terms"
            onClick={() => go('terms')}
            className={`nav-mobile-link ${activeTab === 'terms' ? 'nav-active' : ''}`}
            role="menuitem"
          >
            Terms & Conditions
          </button>
          <button
            id="mobile-nav-contact"
            onClick={() => go('contact')}
            className={`nav-mobile-link ${activeTab === 'contact' ? 'nav-active' : ''}`}
            role="menuitem"
          >
            Contact Us
          </button>
          <button
            id="mobile-nav-auth"
            onClick={() => go('auth')}
            className="nav-mobile-link nav-mobile-cta-btn"
            role="menuitem"
          >
            Sign In / Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

