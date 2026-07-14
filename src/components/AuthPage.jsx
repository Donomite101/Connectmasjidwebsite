import React, { useState } from 'react';
import { Shield, Lock, User, LogIn, UserPlus, CheckCircle2, Building2, Mail } from 'lucide-react';

export default function AuthPage({ setActiveTab }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'community' // 'community' or 'masjid_admin'
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please complete all required fields.');
      return;
    }

    // Simulate authentication
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ name: '', email: '', password: '', role: 'community' });
  };

  return (
    <section className="animate-fade-in" style={{ padding: '70px 0 100px' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        {isLoggedIn ? (
          <div className="clean-form" style={{ padding: '44px', textAlign: 'center', borderRadius: '24px', border: '1px solid var(--border-line)', background: 'white', boxShadow: '0 10px 35px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#166534' }}>
              <CheckCircle2 size={36} color="#4eb00a" />
            </div>
            <span className="pill-badge" style={{ marginBottom: '14px' }}>
              {formData.role === 'masjid_admin' ? 'Masjid Administrator Account' : 'Community Member Account'}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-black)', marginBottom: '8px' }}>
              Welcome, {formData.name || formData.email.split('@')[0]}
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '28px' }}>
              You are successfully signed in to the ConnectMasjid platform.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => {
                  setActiveTab('onboarding');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Building2 size={18} /> Register / Onboard New Masjid
              </button>
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-outline"
                style={{ width: '100%', padding: '12px' }}
              >
                Return to Home Page
              </button>
            </div>

            <button
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="clean-form" style={{ padding: '44px', borderRadius: '24px', border: '1px solid var(--border-line)', background: 'white', boxShadow: '0 10px 35px rgba(0,0,0,0.04)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f8fafc', border: '1px solid var(--border-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Shield size={26} color="#4eb00a" />
              </div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-black)', marginBottom: '8px' }}>
                {isLogin ? 'Sign in to ConnectMasjid' : 'Create Your Account'}
              </h1>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem' }}>
                {isLogin ? 'Access your community portal & verified masjid tools' : 'Join the verified Muslim community network'}
              </p>
            </div>

            {/* Toggle tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#f8fafc', padding: '4px', borderRadius: '14px', border: '1px solid var(--border-line)', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isLogin ? 'white' : 'transparent',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: isLogin ? 'var(--text-black)' : 'var(--text-gray)',
                  boxShadow: isLogin ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: !isLogin ? 'white' : 'transparent',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: !isLogin ? 'var(--text-black)' : 'var(--text-gray)',
                  boxShadow: !isLogin ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div style={{ padding: '12px 16px', background: '#fef2f2', color: '#dc2626', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 600, marginBottom: '20px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {!isLogin && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-black)' }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Full Name"
                      style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-black)' }}>
                  Email Address or Phone
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-black)' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                    style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              {/* Account Role Choice */}
              <div>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-black)' }}>
                  Account Role
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'community' })}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: formData.role === 'community' ? '2px solid #4eb00a' : '1px solid var(--border-line)',
                      background: formData.role === 'community' ? '#f0fdf4' : 'white',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      color: formData.role === 'community' ? '#166534' : 'var(--text-gray)',
                      cursor: 'pointer'
                    }}
                  >
                    Community Member
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'masjid_admin' })}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: formData.role === 'masjid_admin' ? '2px solid #4eb00a' : '1px solid var(--border-line)',
                      background: formData.role === 'masjid_admin' ? '#f0fdf4' : 'white',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      color: formData.role === 'masjid_admin' ? '#166534' : 'var(--text-gray)',
                      cursor: 'pointer'
                    }}
                  >
                    Masjid Administrator
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {isLogin ? (
                  <>
                    <LogIn size={18} /> Sign In
                  </>
                ) : (
                  <>
                    <UserPlus size={18} /> Create Account
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
