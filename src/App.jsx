import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Reviews from './components/Reviews';
import MasjidOnboardingForm from './components/MasjidOnboardingForm';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';

export default function App() {
  const getInitialTab = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (path.includes('/privacy') || hash.includes('#privacy') || search.includes('page=privacy')) {
      return 'privacy';
    }
    if (path.includes('/terms') || hash.includes('#terms') || search.includes('page=terms')) {
      return 'terms';
    }
    if (path.includes('/contact') || hash.includes('#contact') || search.includes('page=contact')) {
      return 'contact';
    }
    if (path.includes('/onboarding') || path.includes('/register') || hash.includes('#onboarding')) {
      return 'onboarding';
    }
    if (path.includes('/auth') || path.includes('/login') || hash.includes('#auth')) {
      return 'auth';
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `/${tab}`);
    }
  };

  return (
    <div className="app-container">
      {/* Exact Hairline Divided Topbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Content */}
      <main>
        {activeTab === 'home' && (
          <>
            <Hero
              onExplore={() => {
                window.scrollTo({ top: 720, behavior: 'smooth' });
              }}
            />
            <Features />
            <Reviews />
          </>
        )}

        {activeTab === 'onboarding' && <MasjidOnboardingForm />}

        {activeTab === 'privacy' && <PrivacyPolicyPage />}

        {activeTab === 'terms' && <TermsAndConditionsPage />}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'auth' && <AuthPage setActiveTab={handleTabChange} />}
      </main>

      {/* Clean Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}
