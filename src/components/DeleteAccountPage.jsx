import React from 'react';
import { deleteAccountData } from '../data/deleteAccountData';
import { Trash2, ShieldAlert, CheckCircle2, Mail, Clock, Smartphone, Lock, ArrowRight, HelpCircle } from 'lucide-react';

export default function DeleteAccountPage() {
  return (
    <section className="animate-fade-in" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="policy-wrapper">
          {/* Header */}
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px', marginBottom: '40px' }}>
            <span className="pill-badge" style={{ marginBottom: '14px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <Trash2 size={14} color="#dc2626" /> Google Play & App Store Compliance
            </span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
              {deleteAccountData.title}
            </h1>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.86rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span>Effective Date: <strong>{deleteAccountData.effectiveDate}</strong></span>
              <span>•</span>
              <span>Last Updated: <strong>{deleteAccountData.lastUpdated}</strong></span>
              <span>•</span>
              <span>Security: <strong>TLS 1.3 Encrypted & Verified</strong></span>
            </div>
            <p style={{ marginTop: '20px', fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 500 }}>
              {deleteAccountData.intro}
            </p>
          </div>

          {/* How Users Can Request Deletion */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Smartphone size={22} color="#166534" /> How to Request Account Deletion
            </h2>

            <div style={{ display: 'grid', gap: '24px' }}>
              {deleteAccountData.methods.map((method) => (
                <div 
                  key={method.id} 
                  style={{ 
                    padding: '24px', 
                    borderRadius: '14px', 
                    background: method.id === 'in-app' ? 'rgba(22, 101, 52, 0.04)' : 'var(--bg-subtle)', 
                    border: method.id === 'in-app' ? '1px solid rgba(22, 101, 52, 0.2)' : '1px solid var(--border)' 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>{method.title}</h3>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      background: method.id === 'in-app' ? '#166534' : 'var(--text-secondary)', 
                      color: 'white',
                      textTransform: 'uppercase'
                    }}>
                      {method.badge}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
                    {method.description}
                  </p>
                  <ol style={{ paddingLeft: '22px', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                    {method.steps.map((step, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>

          {/* What Data Will Be Deleted */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '14px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={22} color="#dc2626" /> {deleteAccountData.deletedData.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.7, fontWeight: 500 }}>
              {deleteAccountData.deletedData.intro}
            </p>

            <div style={{ display: 'grid', gap: '14px' }}>
              {deleteAccountData.deletedData.items.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    padding: '18px 20px', 
                    borderRadius: '12px', 
                    background: 'var(--bg-subtle)', 
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.03rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retained Data & Retention Policy */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '14px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={22} color="#d97706" /> {deleteAccountData.retainedData.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.7, fontWeight: 500 }}>
              {deleteAccountData.retainedData.intro}
            </p>

            <div style={{ display: 'grid', gap: '14px' }}>
              {deleteAccountData.retainedData.items.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    padding: '18px 20px', 
                    borderRadius: '12px', 
                    background: 'rgba(217, 119, 6, 0.04)', 
                    border: '1px solid rgba(217, 119, 6, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.03rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Section */}
          <div style={{ 
            padding: '28px', 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, rgba(22, 101, 52, 0.08) 0%, rgba(22, 101, 52, 0.02) 100%)', 
            border: '1px solid rgba(22, 101, 52, 0.2)' 
          }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={20} color="#166534" /> {deleteAccountData.contact.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>
              If you have any questions or require manual assistance regarding account deletion, data privacy, or GDPR/CCPA data rights, please contact our dedicated platform support team:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Official Privacy Email: </span>
                <a href={`mailto:${deleteAccountData.contact.email}?subject=Account%20Deletion%20Request`} style={{ fontWeight: 700, color: '#166534', textDecoration: 'underline' }}>
                  {deleteAccountData.contact.email}
                </a>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Processing Window: </span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{deleteAccountData.contact.responseWindow}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
