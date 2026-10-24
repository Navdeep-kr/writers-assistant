'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from '@/context/navigation-context';
import { useTheme } from '@/context/theme-context';
import styles from './Navbar.module.css';
import { FileText, Zap, Sun, Moon, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onSignIn?: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onSignIn, 
  className 
}) => {
  const { user, logout, openAuthModal } = useAuth();
  const { isDashOpen, setIsDashOpen } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`${styles.navbar} ${className || ''}`}>
      <div className={styles.navbarInner}>
        {/* Left: Brand Logo */}
        <div className={styles.leftSection}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIconWrapper}>
            <Zap size={18} />
          </div>
          <span className={styles.logoText}>Writing Assistant</span>
        </Link>
      </div>



      {/* Right: Theme Toggle & User Authentication */}
      <div className={styles.rightSection}>
        {/* Theme Toggle Button */}
        <button 
          className={styles.themeToggleBtn}
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          <span className={styles.toggleText}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        {/* User Auth or Menu */}
        {user ? (
          <div className={styles.userMenuWrapper} ref={userMenuRef}>
            <button 
              className={styles.userProfileBtn} 
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User account menu"
            >
              <div className={styles.profileAvatar}>
                {(user.name || user.email)[0].toUpperCase()}
              </div>
              <div className={styles.profileMeta}>
                <span className={styles.profileName}>{user.name || user.email.split('@')[0]}</span>
              </div>
              <span className={styles.chevron} style={{ transform: showUserMenu ? 'rotate(180deg)' : 'none' }}>▾</span>
            </button>

            {showUserMenu && (
              <div className={styles.userDropdown}>
                <div className={styles.userDropdownHeader}>
                  <div className={styles.dropdownAvatar}>
                    {(user.name || user.email)[0].toUpperCase()}
                  </div>
                  <div className={styles.dropdownUserInfo}>
                    <div className={styles.dropdownName}>{user.name || 'Writer'}</div>
                    <div className={styles.dropdownEmail}>{user.email}</div>
                  </div>
                </div>

                <Link 
                  href="/dashboard"
                  className={styles.userDropdownItem}
                  onClick={() => setShowUserMenu(false)}
                >
                  <LayoutDashboard size={15} />
                  <span>Writing Dashboard</span>
                </Link>

                <button 
                  className={styles.userDropdownItem}
                  onClick={() => { setShowUserMenu(false); setIsDashOpen(true); }}
                >
                  <FileText size={15} />
                  <span>My Documents</span>
                </button>

                <div className={styles.dropdownDivider} />

                <button 
                  className={`${styles.userDropdownItem} ${styles.logoutDropdownItem}`}
                  onClick={() => { setShowUserMenu(false); logout(); }}
                >
                  <span className={styles.itemIcon}>🚪</span>
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <button 
              className={styles.loginBtn}
              onClick={() => onSignIn ? onSignIn() : openAuthModal('login')}
            >
              Log In
            </button>
            <button 
              className={styles.signupBtn}
              onClick={() => openAuthModal('signup')}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
