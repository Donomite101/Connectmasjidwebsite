import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-container">
      {/* Exact Hairline Divided Topbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

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

        {activeTab === 'auth' && <AuthPage setActiveTab={setActiveTab} />}
      </main>

      {/* Clean Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
