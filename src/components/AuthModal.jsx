import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import './AuthModal.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://connectmasjid.duckdns.org/api';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
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

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  // ── Handle Submit to Live Backend Server ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (mode === 'login') {
        // LIVE LOGIN REQUEST
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
          const userObj = data.user || { name: formData.emailOrPhone.split('@')[0], emailOrPhone: formData.emailOrPhone };
          localStorage.setItem('cm_token', data.token || 'live_token');
          localStorage.setItem('cm_user', JSON.stringify(userObj));

          setSuccessMsg('Logged in successfully!');
          setTimeout(() => {
            if (onAuthSuccess) onAuthSuccess(userObj);
            onClose();
          }, 800);
        } else {
          setErrorMsg(data.message || 'Invalid login credentials.');
        }
      } else {
        // LIVE SIGNUP REQUEST
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
          const userObj = data.user || { name: formData.name, email: formData.email, phone: formData.phone };
          localStorage.setItem('cm_token', data.token || 'live_token');
          localStorage.setItem('cm_user', JSON.stringify(userObj));

          setSuccessMsg('Account created successfully!');
          setTimeout(() => {
            if (onAuthSuccess) onAuthSuccess(userObj);
            onClose();
          }, 800);
        } else {
          setErrorMsg(data.message || 'Registration failed. Please check inputs.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg('Network error. Unable to connect to ConnectMasjid live backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="auth-close-btn" onClick={onClose} aria-label="Close Modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-icon-badge">
            <ShieldCheck size={24} color="#00b83b" />
          </div>
          <h3 className="auth-title">
            {mode === 'login' ? 'Welcome Back to ConnectMasjid' : 'Create Your Free Account'}
          </h3>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Enter your credentials to access your mosque network'
              : 'Join thousands of Muslims & masjids connected worldwide'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
          >
            Log In
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
          >
            Sign Up
          </button>
        </div>

        {/* Error / Success Alerts */}
        {errorMsg && <div className="auth-alert error">{errorMsg}</div>}
        {successMsg && <div className="auth-alert success">{successMsg}</div>}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="field-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Tariq Rahman"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {mode === 'login' ? (
            <div className="auth-input-group">
              <label>Email or Phone Number</label>
              <div className="input-wrapper">
                <Mail size={18} className="field-icon" />
                <input
                  type="text"
                  name="emailOrPhone"
                  placeholder="Enter email or phone..."
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <div className="auth-input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label>Phone Number (Optional)</label>
                <div className="input-wrapper">
                  <Phone size={18} className="field-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          <div className="auth-input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Referral / Invite Code (Optional)</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="invite_code"
                  placeholder="e.g. CM12345"
                  value={formData.invite_code}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              'Processing...'
            ) : (
              <>
                <span>{mode === 'login' ? 'Log In' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
