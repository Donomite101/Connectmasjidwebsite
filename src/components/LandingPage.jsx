import React, { useEffect } from 'react';
import { Download, Smartphone } from 'lucide-react';

const LandingPage = () => {
  const path = window.location.pathname;
  const isInvite = path.startsWith('/invite');
  const code = path.split('/').pop();
  const playStoreUrl = `https://play.google.com/store/apps/details?id=com.connectmasjid.app${isInvite && code ? `&referrer=invite_code%3D${code}` : ''}`;

  /* On Android, try to open the app for this exact link; if it is not installed the browser
     falls back to the Play Store. Works on both the custom domain and the vercel domain. */
  const appIntentUrl = `intent://${window.location.host}${path}${window.location.search}#Intent;scheme=https;package=com.connectmasjid.app;S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`;

  useEffect(() => {
    if (/android/i.test(navigator.userAgent) && !sessionStorage.getItem('cm_intent_tried')) {
      sessionStorage.setItem('cm_intent_tried', '1');
      window.location.href = appIntentUrl;
    }
  }, [appIntentUrl]);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f6f8',
      padding: '24px',
      textAlign: 'center',
      fontFamily: 'var(--font-body)'
    }}>
      <div 
        className="animate-slide-up"
        style={{
          maxWidth: '400px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)',
          border: '1px solid rgba(16, 185, 129, 0.1)',
        }}
      >
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          color: 'var(--primary-green)'
        }}>
          <Smartphone size={40} />
        </div>

        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          color: '#111827',
          marginBottom: '12px',
          lineHeight: '1.3'
        }}>
          {isInvite ? "You've been invited!" : "View Mosque Details"}
        </h1>
        
        <p style={{ 
          fontSize: '15px', 
          color: '#6B7280',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          {isInvite 
            ? "Download the ConnectMasjid app to accept your invitation, find nearby mosques, and track prayer timings easily."
            : "Download the ConnectMasjid app to view this mosque, get live prayer timings, and stay connected with the community."
          }
        </p>

        <a 
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            backgroundColor: 'var(--primary-green)',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            boxShadow: '0 10px 20px -10px rgba(16, 185, 129, 0.5)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'var(--primary-green)';
          }}
        >
          <Download size={20} />
          <span>Download on Google Play</span>
        </a>

        {/android/i.test(navigator.userAgent) && (
          <a href={appIntentUrl} style={{ display: 'block', marginTop: '16px', color: 'var(--primary-green)', fontWeight: 600, fontSize: '15px' }}>
            Already installed? Open in app
          </a>
        )}

        <div style={{ marginTop: '24px', fontSize: '13px', color: '#9CA3AF' }}>
          ConnectMasjid is available for Android.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
