import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import StackedCards from './components/StackedCards';
import Reviews from './components/Reviews';
import MasjidWallPosters from './components/MasjidWallPosters';
import AppDownloadBanner from './components/AppDownloadBanner';
import MottoBanner from './components/MottoBanner';
import NearbyMasjidFinder from './components/NearbyMasjidFinder';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';
import ContactPage from './components/ContactPage';
import DeleteAccountPage from './components/DeleteAccountPage';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import PrayerTimingWidget from './components/PrayerTimingWidget';

function getTabFromUrl() {
  const path   = window.location.pathname.toLowerCase();
  const hash   = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.includes('delete-account') || path.includes('delete_account') || hash.includes('delete-account') || search.includes('delete-account')) {
    return 'delete-account';
  }
  if (path.includes('privacy') || hash.includes('privacy') || search.includes('privacy')) {
    return 'privacy';
  }
  if (path.includes('terms') || hash.includes('terms') || search.includes('terms')) {
    return 'terms';
  }
  if (path.includes('contact') || hash.includes('contact') || search.includes('contact')) {
    return 'contact';
  }
  if (path.includes('auth') || path.includes('login') || path.includes('register') || path.includes('onboarding') || hash.includes('auth')) {
    return 'auth';
  }
  if (path.includes('invite') || path.includes('mosque') || path.includes('landing')) {
    return 'landing-page';
  }
  return 'home';
}

function normalizeTabName(tab) {
  if (!tab) return 'home';
  const lower = tab.toLowerCase();
  if (lower === 'login' || lower === 'register' || lower === 'onboarding' || lower === 'auth' || lower === 'signin' || lower === 'signup') {
    return 'auth';
  }
  if (lower === 'privacy' || lower === 'privacy-policy') return 'privacy';
  if (lower === 'terms' || lower === 'terms-and-conditions' || lower === 'terms-of-service') return 'terms';
  if (lower === 'contact' || lower === 'contact-us' || lower === 'support') return 'contact';
  if (lower === 'delete-account' || lower === 'delete_account' || lower === 'deleteaccount') return 'delete-account';
  if (lower === 'landing-page' || lower === 'invite' || lower === 'mosque') return 'landing-page';
  return 'home';
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromUrl);

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    /* Kill any GSAP ScrollTriggers and clear inline DOM transforms when navigating away from home */
    try {
      if (activeTab !== 'home') {
        ScrollTrigger.getAll().forEach((t) => {
          try { t.kill(true); } catch (e) {}
        });
        ScrollTrigger.refresh(true);
        gsap.set([document.body, document.documentElement], { clearProps: 'all' });
      }
    } catch (e) {
      /* ignore */
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [activeTab]);

  const handleTabChange = (tab) => {
    const target = normalizeTabName(tab);
    setActiveTab(target);
    const targetPath = target === 'home' ? '/' : `/${target}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className="app-container">
      {/* Floating Glass Navbar — fixed, sits above all content */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Dynamic DOM rendering re-keyed per route to prevent GSAP DOM leakage */}
      {activeTab === 'home' ? (
        <main key="home-view" id="main-home-view">
          <Hero onExplore={() => handleTabChange('auth')} />
          <Features />
          <StackedCards />
          <NearbyMasjidFinder />
          <MottoBanner />
          <Reviews />
          <MasjidWallPosters />
          <AppDownloadBanner />
        </main>
      ) : (
        <main key={`subpage-${activeTab}`} id="main-subpage-view">
          {activeTab === 'auth' && (
            <div className="page-offset">
              <AuthPage setActiveTab={handleTabChange} />
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="page-offset">
              <PrivacyPolicyPage />
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="page-offset">
              <TermsAndConditionsPage />
            </div>
          )}

          {activeTab === 'delete-account' && (
            <div className="page-offset">
              <DeleteAccountPage />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="page-offset">
              <ContactPage />
            </div>
          )}

          {activeTab === 'landing-page' && (
            <div className="page-offset">
              <LandingPage />
            </div>
          )}
        </main>
      )}

      {/* Footer with dark CTA block — shown on all pages */}
      <Footer setActiveTab={handleTabChange} />

      {/* Floating Web Widget with Live Countdown & Desktop Notifications */}
      <PrayerTimingWidget />
    </div>
  );
}
