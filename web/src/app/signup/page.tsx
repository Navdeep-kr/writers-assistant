'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth-context';
import { useNavigation } from '@/context/navigation-context';
import { Mail, Lock, User, Phone, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { user, register } = useAuth();
  const { setShowApp } = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !password) {
      return setError('Please enter your email and password.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    const res = await register(email, phone, password, name);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Account created successfully! Preparing your studio...');
      setShowApp(true);
      setTimeout(() => {
        router.push('/');
      }, 700);
    } else {
      setError(res.error || 'Registration failed. Email might already be registered.');
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'var(--bg-card)',
          border: '1px solid var(--glass-border-strong)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: 'var(--shadow-lg)',
          color: 'var(--text-primary)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '30px',
            background: 'rgba(34, 211, 238, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
            color: 'var(--accent-cyan)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '12px'
          }}>
            <Sparkles size={14} /> AI Writing Assistant
          </div>
          <h1 style={{
            fontSize: '1.9rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            margin: '0 0 8px 0'
          }}>
            Create an Account
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Start drafting, refining, and publishing with AI intelligence.
          </p>
        </div>

        {user ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              background: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#e2e8f0', margin: '0 0 6px 0', fontSize: '0.95rem' }}>
                You already have an active session as:
              </p>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '1.1rem' }}>
                {user.name || user.email}
              </div>
            </div>
            <button
              onClick={() => { setShowApp(true); router.push('/'); }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                color: '#000',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              Go to Workspace →
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '0.88rem',
                marginBottom: '20px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '0.88rem',
                marginBottom: '20px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border-strong)',
                    color: 'var(--text-primary)',
                    padding: '13px 16px 13px 42px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border-strong)',
                    color: 'var(--text-primary)',
                    padding: '13px 16px 13px 42px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border-strong)',
                    color: 'var(--text-primary)',
                    padding: '13px 16px 13px 42px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border-strong)',
                    color: 'var(--text-primary)',
                    padding: '13px 44px 13px 42px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border-strong)',
                    color: 'var(--text-primary)',
                    padding: '13px 16px 13px 42px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? '#475569' : 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                  color: '#030712',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  marginTop: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 18px rgba(34, 211, 238, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? 'Creating Account...' : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '28px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}>
                Log In →
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
