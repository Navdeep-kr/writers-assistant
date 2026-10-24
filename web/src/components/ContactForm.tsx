'use client';

import React, { useState } from 'react';
import GlassButton from '@/components/ui/GlassButton';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div style={{ background: 'var(--bg-card)', padding: '36px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>
            Message Received!
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Thank you, <strong>{name}</strong>. Our {category === 'sales' ? 'Enterprise Sales' : 'Global Support'} team has received your inquiry and will respond to <strong>{email}</strong> within our standard SLA window.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            style={{
              background: 'rgba(0, 245, 255, 0.1)',
              border: '1px solid var(--accent-cyan)',
              color: 'var(--accent-cyan)',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Send us a Direct Message
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            We typically respond in under 2 hours for Pro users and within 24 hours for standard inquiries.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Full Name *
              </label>
              <input 
                type="text" 
                required
                placeholder="Jane Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border-strong)', padding: '12px 16px', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Email Address *
              </label>
              <input 
                type="email" 
                required
                placeholder="jane@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border-strong)', padding: '12px 16px', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Inquiry Type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border-strong)', padding: '12px 16px', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
            >
              <option value="support" style={{ background: '#111', color: '#fff' }}>Technical & Customer Support</option>
              <option value="sales" style={{ background: '#111', color: '#fff' }}>Enterprise & Team Licensing</option>
              <option value="billing" style={{ background: '#111', color: '#fff' }}>Billing & Invoicing</option>
              <option value="feedback" style={{ background: '#111', color: '#fff' }}>Feature Suggestion / Feedback</option>
              <option value="partners" style={{ background: '#111', color: '#fff' }}>Strategic Partnerships</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Your Message *
            </label>
            <textarea 
              required
              placeholder="How can our engineering or support team help you?" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '100%', minHeight: '140px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border-strong)', padding: '14px 16px', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none', lineHeight: 1.6, resize: 'vertical' }}
            />
          </div>

          <GlassButton 
            variant="primary" 
            glow 
            loading={loading}
            className="w-full sm:w-auto"
          >
            🚀 Send Message
          </GlassButton>
        </form>
      )}
    </div>
  );
}
