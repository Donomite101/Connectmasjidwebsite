import React from 'react';
import { privacyPolicyData } from '../data/privacyPolicyData';
import { ShieldCheck, Calendar, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <section className="animate-fade-in" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="policy-wrapper">
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px', marginBottom: '40px' }}>
            <span className="pill-badge" style={{ marginBottom: '14px' }}>
              <ShieldCheck size={14} /> Official Documentation
            </span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              {privacyPolicyData.title}
            </h1>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.86rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span>Effective Date: <strong>{privacyPolicyData.effectiveDate}</strong></span>
              <span>•</span>
              <span>Last Updated: <strong>{privacyPolicyData.lastUpdated}</strong></span>
              <span>•</span>
              <span>Security: <strong>TLS 1.3 Encrypted</strong></span>
            </div>
          </div>

          <div>
            {privacyPolicyData.sections.map((sec) => (
              <div key={sec.id} style={{ marginBottom: '44px' }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '14px', color: 'var(--text-primary)' }}>
                  {sec.title}
                </h2>

                {sec.content && sec.content.map((p, idx) => (
                  <p key={idx} style={{ color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.7 }}>
                    {p}
                  </p>
                ))}

                {sec.intro && (
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.7, fontWeight: 500 }}>
                    {sec.intro}
                  </p>
                )}

                {sec.subsections && sec.subsections.map((sub, sIdx) => (
                  <div key={sIdx} style={{ marginTop: '18px', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.08rem', marginBottom: '8px' }}>{sub.title}</h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {sub.items.map((it, iIdx) => (
                        <li key={iIdx} style={{ marginBottom: '8px' }}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {sec.items && (
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '12px' }}>
                    {sec.items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '10px' }}>
                        <strong>{item.title}: </strong>{item.desc}
                      </li>
                    ))}
                  </ul>
                )}

                {sec.partners && (
                  <div style={{ display: 'grid', gap: '10px', marginTop: '14px' }}>
                    {sec.partners.map((partner, pIdx) => (
                      <div key={pIdx} style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                        <div style={{ fontWeight: 600 }}>{partner.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{partner.role}</div>
                      </div>
                    ))}
                  </div>
                )}

                {sec.contacts && (
                  <div style={{ display: 'grid', gap: '12px', marginTop: '14px' }}>
                    {sec.contacts.map((c, cIdx) => (
                      <div key={cIdx} style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{c.label}</div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
