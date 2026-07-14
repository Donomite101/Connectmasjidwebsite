import React from 'react';
import { termsData } from '../data/termsData';
import { ShieldCheck, FileText } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <section className="animate-fade-in" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="policy-wrapper">
          <div style={{ borderBottom: '1px solid var(--border-line)', paddingBottom: '32px', marginBottom: '40px' }}>
            <span className="pill-badge" style={{ marginBottom: '14px' }}>
              <FileText size={14} color="#4eb00a" /> Official Documentation
            </span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '12px', color: 'var(--text-black)' }}>
              {termsData.title}
            </h1>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.86rem', color: 'var(--text-gray)', flexWrap: 'wrap' }}>
              <span>Effective Date: <strong>{termsData.effectiveDate}</strong></span>
              <span>•</span>
              <span>Security: <strong>TLS 1.3 Encrypted</strong></span>
            </div>
            {termsData.intro && (
              <p style={{ marginTop: '20px', fontSize: '1.02rem', color: 'var(--text-gray)', lineHeight: 1.7, fontWeight: 500 }}>
                {termsData.intro}
              </p>
            )}
          </div>

          <div>
            {termsData.sections.map((sec) => (
              <div key={sec.id} style={{ marginBottom: '44px' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '14px', color: 'var(--text-black)' }}>
                  {sec.title}
                </h2>

                {sec.intro && (
                  <p style={{ color: 'var(--text-gray)', marginBottom: '14px', lineHeight: 1.7, fontWeight: 500 }}>
                    {sec.intro}
                  </p>
                )}

                {sec.content && sec.content.map((p, idx) => (
                  <p key={idx} style={{ color: 'var(--text-gray)', marginBottom: '14px', lineHeight: 1.7 }}>
                    {p}
                  </p>
                ))}

                {sec.bullets && (
                  <ul style={{ paddingLeft: '22px', color: 'var(--text-gray)', lineHeight: 1.8, marginTop: '10px' }}>
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
