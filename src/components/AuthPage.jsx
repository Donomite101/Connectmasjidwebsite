import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, User, LogIn, UserPlus, CheckCircle2, Building2, Mail, Phone, Eye, EyeOff, RefreshCw, ArrowRight, Trash2 } from 'lucide-react';
import './AuthPage.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://connectmasjid.duckdns.org/api';

export default function AuthPage({ setActiveTab }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    email: '',
    phone: '',
    password: '',
    invite_code: '',
  });

  // User State from LocalStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cm_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      return (parsed && typeof parsed === 'object') ? parsed : null;
    } catch (e) {
      return null;
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
    setSuccessMsg('');
  };

  // ── Live Backend Submit ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isLogin) {
        // LIVE BACKEND LOGIN
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            emailOrPhone: formData.emailOrPhone,
            password: formData.password,
          }),
        });

        const data = await res.json();
        if (res.ok && (data.status === 'SUCCESS' || data.token || data.user)) {
          const userObj = data.user || {
            name: formData.emailOrPhone.split('@')[0],
            emailOrPhone: formData.emailOrPhone,
          };
          setUser(userObj);
          localStorage.setItem('cm_user', JSON.stringify(userObj));
          if (data.token) localStorage.setItem('cm_token', data.token);

          setSuccessMsg('Successfully signed in to ConnectMasjid!');
          setLoading(false);
          return;
        } else {
          setErrorMsg(data.message || 'Invalid login credentials. Please check your details.');
        }
      } else {
        // LIVE BACKEND REGISTER
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            invite_code: formData.invite_code,
          }),
        });

        const data = await res.json();
        if (res.ok && (data.status === 'SUCCESS' || data.token || data.user)) {
          const userObj = data.user || {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          };
          setUser(userObj);
          localStorage.setItem('cm_user', JSON.stringify(userObj));
          if (data.token) localStorage.setItem('cm_token', data.token);

          setSuccessMsg('Member account created successfully!');
          setLoading(false);
          return;
        } else {
          setErrorMsg(data.message || 'Registration failed. Please verify your details.');
        }
      }
    } catch (err) {
      console.error('Live auth request error:', err);
      setErrorMsg('Network error. Unable to connect to ConnectMasjid live backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cm_user');
    localStorage.removeItem('cm_token');
    setFormData({ name: '', emailOrPhone: '', email: '', phone: '', password: '', invite_code: '' });
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <section className="ios-auth-section">
      {/* Background iOS Spheres */}
      <div className="ios-glow-sphere-1" />
      <div className="ios-glow-sphere-2" />

      <div className={`ios-auth-container ${!isLogin ? 'signup-mode' : ''}`}>
        {user ? (
          /* Signed In Dashboard View */
          <div className="ios-auth-card ios-user-card">
            <div className="ios-user-avatar">
              <CheckCircle2 size={40} color="#00b83b" />
            </div>
            <span className="ios-role-badge">
              👤 ConnectMasjid Verified Member
            </span>
            <h2 className="ios-auth-title" style={{ marginTop: '10px' }}>
              Welcome, {user.name || 'Member'}
            </h2>
            <p className="ios-auth-subtitle" style={{ marginBottom: '24px' }}>
              Signed in as <strong>{user.email || user.emailOrPhone || user.phone || 'Member'}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('home');
                  setTimeout(() => {
                    const el = document.getElementById('nearby-masjids');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="ios-submit-btn"
              >
                <span>Find Nearby Verified Mosques</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('delete-account');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '14px',
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Trash2 size={16} color="#dc2626" /> Delete My Account
              </button>
            </div>

            <button onClick={handleLogout} className="ios-signout-btn">
              Sign Out of Account
            </button>
          </div>
        ) : (
          /* Full Screen Clean iPhone Style Auth Form */
          <div className="ios-auth-card">
            {/* Header */}
            <div className="ios-auth-header">
              <div className="ios-auth-icon-badge">
                <ShieldCheck size={26} color="#00b83b" />
              </div>
              <h1 className="ios-auth-title">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h1>
              <p className="ios-auth-subtitle">
                {isLogin
                  ? 'Access live verified timings, Adhan alerts & mosque notices'
                  : 'Join thousands of Muslims & masjids connected worldwide'}
              </p>
            </div>

            {/* iOS Segmented Control */}
            <div className="ios-segmented-control">
              <button
                type="button"
                className={`ios-segment-btn ${isLogin ? 'active' : ''}`}
                onClick={() => { setIsLogin(true); setErrorMsg(''); setSuccessMsg(''); }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`ios-segment-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => { setIsLogin(false); setErrorMsg(''); setSuccessMsg(''); }}
              >
                Sign Up
              </button>
            </div>

            {/* Feedback Banners */}
            {errorMsg && <div className="ios-alert error">{errorMsg}</div>}
            {successMsg && <div className="ios-alert success">{successMsg}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="ios-form">
              {isLogin ? (
                /* Sign In Fields */
                <div className="ios-form-single">
                  <div className="ios-input-group">
                    <label className="ios-input-label">Email Address or Phone</label>
                    <div className="ios-input-wrapper">
                      <Mail size={18} className="ios-input-icon" />
                      <input
                        type="text"
                        name="emailOrPhone"
                        required
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        placeholder="Enter email or phone number..."
                        className="ios-input-field"
                      />
                    </div>
                  </div>

                  <div className="ios-input-group">
                    <label className="ios-input-label">Password</label>
                    <div className="ios-input-wrapper">
                      <Lock size={18} className="ios-input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="ios-input-field"
                      />
                      <button
                        type="button"
                        className="ios-eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Sign Up Fields Grid for non-scrollable laptop view */
                <div className="ios-form-grid">
                  <div className="ios-input-group">
                    <label className="ios-input-label">Full Name</label>
                    <div className="ios-input-wrapper">
                      <User size={18} className="ios-input-icon" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Tariq Rahman"
                        className="ios-input-field"
                      />
                    </div>
                  </div>

                  <div className="ios-input-group">
                    <label className="ios-input-label">Email Address</label>
                    <div className="ios-input-wrapper">
                      <Mail size={18} className="ios-input-icon" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="ios-input-field"
                      />
                    </div>
                  </div>

                  <div className="ios-input-group">
                    <label className="ios-input-label">Phone Number (Optional)</label>
                    <div className="ios-input-wrapper">
                      <Phone size={18} className="ios-input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="ios-input-field"
                      />
                    </div>
                  </div>

                  <div className="ios-input-group">
                    <label className="ios-input-label">Referral / Invite Code (Optional)</label>
                    <div className="ios-input-wrapper">
                      <input
                        type="text"
                        name="invite_code"
                        value={formData.invite_code}
                        onChange={handleChange}
                        placeholder="e.g. CM12345"
                        className="ios-input-field"
                        style={{ paddingLeft: '16px' }}
                      />
                    </div>
                  </div>

                  <div className="ios-input-group full-width">
                    <label className="ios-input-label">Password</label>
                    <div className="ios-input-wrapper">
                      <Lock size={18} className="ios-input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="ios-input-field"
                      />
                      <button
                        type="button"
                        className="ios-eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="ios-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw size={18} className="spin-icon" />
                    <span>Processing...</span>
                  </>
                ) : isLogin ? (
                  <>
                    <span>Sign In</span>
                    <LogIn size={18} />
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <UserPlus size={18} />
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
