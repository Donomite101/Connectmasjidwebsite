import React, { useEffect } from 'react';
import { termsData } from '../data/termsData';
import { ShieldCheck, FileText } from 'lucide-react';

export default function TermsAndConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <section className="animate-fade-in" style={{ padding: '60px 20px 100px', minHeight: '80vh', background: '#ffffff', opacity: 1, position: 'relative', zIndex: 5 }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', width: '100%' }}>
        <div className="policy-wrapper" style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '40px', boxShadow: '0 10px 35px rgba(0,0,0,0.05)' }}>
          <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '28px', marginBottom: '36px' }}>
            <span className="pill-badge" style={{ marginBottom: '14px', background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={14} color="#00b83b" /> Official Documentation
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', marginTop: '10px' }}>
              {termsData.title}
            </h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.86rem', color: '#64748b', flexWrap: 'wrap' }}>
              <span>Effective Date: <strong style={{ color: '#0f172a' }}>{termsData.effectiveDate}</strong></span>
              <span>•</span>
              <span>Security: <strong style={{ color: '#00b83b' }}>TLS 1.3 Encrypted</strong></span>
            </div>
            {termsData.intro && (
              <p style={{ marginTop: '20px', fontSize: '1.02rem', color: '#334155', lineHeight: 1.7, fontWeight: 500 }}>
                {termsData.intro}
              </p>
            )}
          </div>

          <div>
            {termsData.sections.map((sec) => (
              <div key={sec.id} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
                  {sec.title}
                </h2>

                {sec.intro && (
                  <p style={{ color: '#334155', marginBottom: '14px', lineHeight: 1.7, fontWeight: 500 }}>
                    {sec.intro}
                  </p>
                )}

                {sec.content && sec.content.map((p, idx) => (
                  <p key={idx} style={{ color: '#334155', marginBottom: '14px', lineHeight: 1.7 }}>
                    {p}
                  </p>
                ))}

                {sec.bullets && (
                  <ul style={{ paddingLeft: '22px', color: '#334155', lineHeight: 1.8, marginTop: '10px' }}>
                    {sec.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: '8px' }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
