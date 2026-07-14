import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="animate-fade-in" style={{ padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="pill-badge" style={{ marginBottom: '16px' }}>
            <Mail size={14} color="#4eb00a" /> We're Here to Help
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-black)', marginBottom: '16px' }}>
            Contact ConnectMasjid Support
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-gray)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            Have questions about prayer synchronization, masjid verification, or our community platform? Reach out to our dedicated support team.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* Direct Support Details Card */}
          <div className="review-card" style={{ padding: '36px', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-black)', marginBottom: '24px' }}>
              Direct Contact Details
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div className="feature-icon" style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px' }}>
                  <Mail size={20} color="#4eb00a" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-black)', fontSize: '0.95rem' }}>Email Support</div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-gray)', marginBottom: '4px' }}>For general support & user queries</div>
                  <a href="mailto:support@connectmasjid.com" style={{ fontWeight: 600, color: '#166534', fontSize: '0.92rem' }}>
                    support@connectmasjid.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div className="feature-icon" style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px' }}>
                  <MessageSquare size={20} color="#4eb00a" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-black)', fontSize: '0.95rem' }}>Administration Contact</div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-gray)', marginBottom: '4px' }}>Direct platform administration</div>
                  <a href="mailto:amanullahpathan9854@gmail.com" style={{ fontWeight: 600, color: '#166534', fontSize: '0.92rem' }}>
                    amanullahpathan9854@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div className="feature-icon" style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px' }}>
                  <ShieldCheck size={20} color="#4eb00a" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-black)', fontSize: '0.95rem' }}>Community Commitment</div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-gray)', lineHeight: 1.5 }}>
                    We aim to respond to all community inquiries within 24–48 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="review-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-black)', marginBottom: '20px' }}>
              Send Us a Message
            </h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={48} color="#4eb00a" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-black)', marginBottom: '8px' }}>
                  Message Sent Successfully
                </h3>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem', marginBottom: '24px' }}>
                  Thank you for reaching out to ConnectMasjid. Our team will review your message promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-black)' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-line)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-black)' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-line)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-black)' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Prayer Timings / Masjid Feedback / Question"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-line)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-black)' }}>
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we assist you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-line)', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
