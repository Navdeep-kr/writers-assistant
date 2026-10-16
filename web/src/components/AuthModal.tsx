'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth-context';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  initialMode?: 'login' | 'signup';
  onLogin?: (email: string, password?: string) => Promise<boolean | any>;
  onRegister?: (email: string, phone: string, password: string, name?: string) => Promise<boolean | any>;
  onSkip?: () => void;
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  initialMode = 'login', 
  onLogin, 
  onRegister, 
  onSkip, 
  onClose 
}) => {
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  
  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
        else auth.closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, auth]);

  const handleClose = () => {
    if (onClose) onClose();
    else auth.closeAuthModal();
  };

  const handleDemoFill = async () => {
    setEmail('demo@writingassistant.ai');
    setPassword('password123');
    setIsLogin(true);
    setError('');
    setLoading(true);
    const res = await auth.login('demo@writingassistant.ai', 'password123');
    setLoading(false);
    if (res.success) {
      setSuccessMsg('Logged in as Demo Writer!');
      setTimeout(() => {
        handleClose();
      }, 500);
    } else {
      setError(res.error || 'Demo login failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    // Quick validation
    if (!email || !password) {
      return setError('Please enter your email and password.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    
    if (!isLogin) {
      if (password !== confirmPassword) {
        return setError('Passwords do not match.');
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        if (onLogin) {
          const ok = await onLogin(email, password);
          if (!ok) setError('Invalid email or password.');
          else handleClose();
        } else {
          const res = await auth.login(email, password);
          if (!res.success) {
            setError(res.error || 'Invalid email or password.');
          } else {
            setSuccessMsg('Welcome back!');
            setTimeout(handleClose, 500);
          }
        }
      } else {
        if (onRegister) {
          const ok = await onRegister(email, phone, password, name);
          if (!ok) setError('Registration failed. Email might already be in use.');
          else handleClose();
        } else {
          const res = await auth.register(email, phone, password, name);
          if (!res.success) {
            setError(res.error || 'Registration failed. Email might already be in use.');
          } else {
            setSuccessMsg('Account created successfully!');
            setTimeout(handleClose, 500);
          }
        }
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(5, 7, 15, 0.85)', backdropFilter: 'blur(16px)', zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 25, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            position: 'relative',
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border-strong)', 
            borderRadius: '24px', padding: '36px', width: '100%', maxWidth: '460px',
            boxShadow: 'var(--shadow-lg), 0 0 40px rgba(34, 211, 238, 0.08)',
            color: 'var(--text-primary)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              borderRadius: '50%', width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--glass-bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--glass-bg)'; }}
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '30px',
              background: 'rgba(34, 211, 238, 0.08)', border: '1px solid rgba(34, 211, 238, 0.2)',
              color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px'
            }}>
              <Sparkles size={14} /> AI Writing Assistant Suite
            </div>
            <h2 style={{ 
              fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', 
              color: 'var(--text-primary)', margin: 0 
            }}>
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px' }}>
              {isLogin ? 'Sign in to access your drafts and AI tools.' : 'Join 2.5M+ writers creating exceptional content.'}
            </p>
          </div>

          {/* Segmented Mode Selector */}
          <div style={{
            display: 'flex', background: 'var(--glass-bg)',
            padding: '4px', borderRadius: '12px', border: '1px solid var(--glass-border)',
            marginBottom: '20px'
          }}>
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(''); setSuccessMsg(''); }}
              style={{
                flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
                background: isLogin ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
                borderBottom: isLogin ? '1px solid rgba(34, 211, 238, 0.5)' : 'none',
                color: isLogin ? 'var(--accent-cyan)' : 'var(--text-secondary)', fontWeight: isLogin ? 700 : 500,
                fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(''); setSuccessMsg(''); }}
              style={{
                flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
                background: !isLogin ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
                borderBottom: !isLogin ? '1px solid rgba(34, 211, 238, 0.5)' : 'none',
                color: !isLogin ? 'var(--accent-cyan)' : 'var(--text-secondary)', fontWeight: !isLogin ? 700 : 500,
                fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', 
              padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', 
              marginBottom: '16px', border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', 
              padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', 
              marginBottom: '16px', border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {!isLogin && (
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  style={{ 
                    width: '100%', boxSizing: 'border-box', background: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border-strong)', color: 'var(--text-primary)', 
                    padding: '12px 14px 12px 40px', borderRadius: '12px', fontSize: '0.92rem', 
                    outline: 'none', transition: 'border-color 0.2s' 
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
                />
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', boxSizing: 'border-box', background: 'var(--glass-bg)', 
                  border: '1px solid var(--glass-border-strong)', color: 'var(--text-primary)', 
                  padding: '12px 14px 12px 40px', borderRadius: '12px', fontSize: '0.92rem', 
                  outline: 'none', transition: 'border-color 0.2s' 
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
              />
            </div>

            {!isLogin && (
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="tel" 
                  placeholder="Phone Number (Optional)" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ 
                    width: '100%', boxSizing: 'border-box', background: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border-strong)', color: 'var(--text-primary)', 
                    padding: '12px 14px 12px 40px', borderRadius: '12px', fontSize: '0.92rem', 
                    outline: 'none', transition: 'border-color 0.2s' 
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
                />
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password (min. 6 characters)" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', boxSizing: 'border-box', background: 'var(--glass-bg)', 
                  border: '1px solid var(--glass-border-strong)', color: 'var(--text-primary)', 
                  padding: '12px 40px 12px 40px', borderRadius: '12px', fontSize: '0.92rem', 
                  outline: 'none', transition: 'border-color 0.2s' 
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {!isLogin && (
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Confirm Password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ 
                    width: '100%', boxSizing: 'border-box', background: 'var(--glass-bg)', 
                    border: '1px solid var(--glass-border-strong)', color: 'var(--text-primary)', 
                    padding: '12px 14px 12px 40px', borderRadius: '12px', fontSize: '0.92rem', 
                    outline: 'none', transition: 'border-color 0.2s' 
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border-strong)'}
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                background: loading ? '#475569' : 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))', 
                color: '#030712', padding: '13px', borderRadius: '12px', fontWeight: 700, 
                fontSize: '0.95rem', marginTop: '6px', cursor: loading ? 'not-allowed' : 'pointer', 
                border: 'none', boxShadow: '0 4px 18px rgba(34, 211, 238, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              {loading ? 'Processing...' : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          {isLogin && (
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={handleDemoFill}
                disabled={loading}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px dashed rgba(34, 211, 238, 0.4)',
                  color: 'var(--accent-cyan)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'; }}
              >
                <Sparkles size={13} />
                One-Click Demo Account Login
              </button>
            </div>
          )}

          {/* Bottom Switch Link */}
          <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMsg(''); }}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{isLogin ? 'Sign Up free' : 'Log In'}</span>
            </button>

            {onSkip && (
              <button 
                type="button"
                onClick={onSkip}
                style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Continue as Guest
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
