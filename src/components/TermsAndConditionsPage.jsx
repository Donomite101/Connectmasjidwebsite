import React, { useEffect } from 'react';
import { termsData } from '../data/termsData';
import { FileText, AlertTriangle, Info, Scale, ShieldCheck } from 'lucide-react';

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
              <Scale size={14} color="#00b83b" /> Legally Binding Agreement
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', marginTop: '10px' }}>
              {termsData.title}
            </h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.86rem', color: '#64748b', flexWrap: 'wrap' }}>
              <span>Effective Date: <strong style={{ color: '#0f172a' }}>{termsData.effectiveDate}</strong></span>
              <span>•</span>
              <span>Last Updated: <strong style={{ color: '#0f172a' }}>{termsData.lastUpdated || termsData.effectiveDate}</strong></span>
              <span>•</span>
              <span>Jurisdiction: <strong style={{ color: '#0f172a' }}>{termsData.jurisdiction || 'Pune, India'}</strong></span>
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
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
                  {sec.title}
                </h2>

                {sec.alert && (
                  <div style={{
                    background: sec.alert.type === 'critical' ? '#fef2f2' : sec.alert.type === 'info' ? '#eff6ff' : '#fffbeb',
                    border: `1px solid ${sec.alert.type === 'critical' ? '#fecaca' : sec.alert.type === 'info' ? '#bfdbfe' : '#fde68a'}`,
                    borderRadius: '14px',
                    padding: '16px 20px',
                    marginBottom: '18px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}>
                    {sec.alert.type === 'info' ? (
                      <Info size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
                    ) : (
                      <AlertTriangle size={20} color={sec.alert.type === 'critical' ? '#dc2626' : '#d97706'} style={{ flexShrink: 0, marginTop: '2px' }} />
                    )}
                    <div>
                      <div style={{ fontWeight: 700, color: sec.alert.type === 'critical' ? '#991b1b' : sec.alert.type === 'info' ? '#1e40af' : '#92400e', marginBottom: '4px', fontSize: '0.98rem' }}>
                        {sec.alert.title}
                      </div>
                      <div style={{ color: sec.alert.type === 'critical' ? '#7f1d1d' : sec.alert.type === 'info' ? '#1e3a8a' : '#78350f', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        {sec.alert.message}
                      </div>
                    </div>
                  </div>
                )}

                {sec.intro && (
                  <p style={{ color: '#334155', marginBottom: '14px', lineHeight: 1.7, fontWeight: 500 }}>
                    {sec.intro}
                  </p>
                )}

                {sec.content && sec.content.map((p, idx) => (
                  <p key={idx} style={{ color: '#334155', marginBottom: '14px', lineHeight: 1.7, fontSize: '0.98rem' }}>
                    {p}
                  </p>
                ))}

                {sec.subsections && sec.subsections.map((sub, sIdx) => (
                  <div key={sIdx} style={{ marginTop: '18px', marginBottom: '18px', padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                      {sub.title}
                    </h3>
                    <ul style={{ paddingLeft: '20px', color: '#334155', lineHeight: 1.75, margin: 0 }}>
                      {sub.items.map((it, iIdx) => (
                        <li key={iIdx} style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {sec.items && (
                  <ul style={{ paddingLeft: '20px', color: '#334155', lineHeight: 1.7, marginTop: '12px' }}>
                    {sec.items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '10px', fontSize: '0.95rem' }}>
                        <strong style={{ color: '#0f172a' }}>{item.title}: </strong>{item.desc}
                      </li>
                    ))}
                  </ul>
                )}

                {sec.bullets && (
                  <ul style={{ paddingLeft: '22px', color: '#334155', lineHeight: 1.8, marginTop: '10px' }}>
                    {sec.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {sec.contacts && (
                  <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
                    {sec.contacts.map((c, cIdx) => (
                      <div key={cIdx} style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>{c.label}</div>
                        <a
                          href={c.href || '#'}
                          target={c.href?.startsWith('http') ? '_blank' : undefined}
                          rel={c.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          style={{ fontWeight: 700, color: '#00b83b', textDecoration: 'none', fontSize: '0.98rem' }}
                        >
                          {c.value}
                        </a>
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
