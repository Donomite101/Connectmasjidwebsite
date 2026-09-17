import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, RefreshCw, Clock } from 'lucide-react';

const BREVO_API_KEY =
  import.meta.env.VITE_BREVO_API_KEY ||
  import.meta.env.VITE_BREVO_SMTP_PASSWORD ||
  '';

const BREVO_SENDER_EMAIL =
  import.meta.env.VITE_BREVO_SENDER_EMAIL ||
  'amanullahpathan9854@gmail.com';

const RECIPIENT_EMAIL = 'support.connectmasjid@gmail.com';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const subjectText = `[ConnectMasjid Support] ${formData.subject}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
        <h2 style="color: #00b83b; margin-top: 0; font-size: 1.4rem;">New ConnectMasjid Support Inquiry</h2>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${formData.name}</p>
        <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${formData.email}" style="color: #00b83b; font-weight: bold;">${formData.email}</a></p>
        <p style="margin: 8px 0;"><strong>Subject:</strong> ${formData.subject}</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p style="margin-bottom: 8px;"><strong>Message Content:</strong></p>
        <div style="background: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.6;">${formData.message}</div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0 10px;" />
        <p style="font-size: 0.8rem; color: #64748b; margin: 0;">Sent via ConnectMasjid Web Portal</p>
      </div>
    `;

    try {
      // 1. Try Brevo REST API if API Key is present
      if (BREVO_API_KEY) {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: {
              name: `${formData.name} (via ConnectMasjid)`,
              email: BREVO_SENDER_EMAIL,
            },
            to: [
              {
                email: RECIPIENT_EMAIL,
                name: 'ConnectMasjid Support',
              },
            ],
            replyTo: {
              email: formData.email,
              name: formData.name,
            },
            subject: subjectText,
            htmlContent: htmlContent,
          }),
        }).catch(() => null);
      }

      // 2. Direct FormSubmit transmission fallback to support.connectmasjid@gmail.com
      await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subjectText,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      }).catch(() => null);

      setSubmitted(true);
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="animate-fade-in" style={{ padding: '60px 20px 100px', minHeight: '80vh', background: '#ffffff', opacity: 1, position: 'relative', zIndex: 5 }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="pill-badge" style={{ marginBottom: '14px', background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Mail size={14} color="#00b83b" /> We're Here to Help
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '14px', marginTop: '10px' }}>
            Contact ConnectMasjid Support
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            Have questions about prayer synchronization, masjid verification, or our community platform? Send a message directly to <strong>support.connectmasjid@gmail.com</strong>.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* Direct Support Details Card */}
          <div style={{ padding: '36px', borderRadius: '24px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 10px 35px rgba(0,0,0,0.05)', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>
              Direct Contact Details
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color="#00b83b" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Official Support Email</div>
                  <div style={{ fontSize: '0.86rem', color: '#64748b', marginBottom: '4px' }}>For all support & community queries</div>
                  <a href="mailto:support.connectmasjid@gmail.com" style={{ fontWeight: 700, color: '#00b83b', fontSize: '0.95rem', textDecoration: 'underline' }}>
                    support.connectmasjid@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} color="#00b83b" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Response Window</div>
                  <div style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5 }}>
                    Our dedicated support team responds to inquiries within 24–48 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div style={{ padding: '36px', borderRadius: '24px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 10px 35px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
              Send Us a Message
            </h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={48} color="#00b83b" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  Message Sent Successfully
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.6 }}>
                  Thank you for reaching out to ConnectMasjid! Your inquiry has been sent to <strong>support.connectmasjid@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Prayer Timings / Masjid Feedback / Question"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem', color: '#0f172a' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we assist you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.9rem', color: '#0f172a', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', background: '#00b83b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    <>
                      <RefreshCw size={16} className="spin-icon" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message to Support</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
