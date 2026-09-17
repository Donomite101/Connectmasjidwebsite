import React, { useEffect } from 'react';
import { privacyPolicyData } from '../data/privacyPolicyData';
import { ShieldCheck, Calendar, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
              <ShieldCheck size={14} /> Official Documentation
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', marginTop: '10px' }}>
              {privacyPolicyData.title}
            </h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.86rem', color: '#64748b', flexWrap: 'wrap' }}>
              <span>Effective Date: <strong style={{ color: '#0f172a' }}>{privacyPolicyData.effectiveDate}</strong></span>
              <span>•</span>
              <span>Last Updated: <strong style={{ color: '#0f172a' }}>{privacyPolicyData.lastUpdated}</strong></span>
              <span>•</span>
              <span>Security: <strong style={{ color: '#00b83b' }}>TLS 1.3 Encrypted</strong></span>
            </div>
          </div>

          <div>
            {privacyPolicyData.sections.map((sec) => (
              <div key={sec.id} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '14px', color: '#0f172a' }}>
                  {sec.title}
                </h2>

                {sec.content && sec.content.map((p, idx) => (
                  <p key={idx} style={{ color: '#334155', marginBottom: '14px', lineHeight: 1.7, fontSize: '0.98rem' }}>
                    {p}
                  </p>
                ))}

                {sec.intro && (
                  <p style={{ color: '#334155', marginBottom: '14px', lineHeight: 1.7, fontWeight: 600, fontSize: '0.98rem' }}>
                    {sec.intro}
                  </p>
                )}

                {sec.subsections && sec.subsections.map((sub, sIdx) => (
                  <div key={sIdx} style={{ marginTop: '18px', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{sub.title}</h3>
                    <ul style={{ paddingLeft: '20px', color: '#334155', lineHeight: 1.7 }}>
                      {sub.items.map((it, iIdx) => (
                        <li key={iIdx} style={{ marginBottom: '8px' }}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {sec.items && (
                  <ul style={{ paddingLeft: '20px', color: '#334155', lineHeight: 1.7, marginTop: '12px' }}>
                    {sec.items.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '10px' }}>
                        <strong style={{ color: '#0f172a' }}>{item.title}: </strong>{item.desc}
                      </li>
                    ))}
                  </ul>
                )}

                {sec.partners && (
                  <div style={{ display: 'grid', gap: '10px', marginTop: '14px' }}>
                    {sec.partners.map((partner, pIdx) => (
                      <div key={pIdx} style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: '4px' }}>{partner.name}</div>
                        <div style={{ fontSize: '0.88rem', color: '#64748b' }}>{partner.role}</div>
                      </div>
                    ))}
                  </div>
                )}

                {sec.contacts && (
                  <div style={{ display: 'grid', gap: '12px', marginTop: '14px' }}>
                    {sec.contacts.map((c, cIdx) => (
                      <div key={cIdx} style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>{c.label}</div>
                        <a href={c.href || '#'} style={{ fontWeight: 700, color: '#00b83b', textDecoration: 'none', fontSize: '0.98rem' }}>{c.value}</a>
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
