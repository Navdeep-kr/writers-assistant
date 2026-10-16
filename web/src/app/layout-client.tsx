'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import Navbar from '@/components/Navbar';
import CommandPalette from '@/components/CommandPalette';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import styles from './layout-client.module.css';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthModalOpen, authModalMode, closeAuthModal } = useAuth();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Informational pages that display the footer
  const infoRoutes = [
    '/about', '/careers', '/privacy', '/terms', '/cookies', 
    '/responsible-ai', '/press', '/affiliates', '/help', '/contact', '/pricing',
    '/login', '/signup'
  ];
  const isInfoPage = infoRoutes.includes(pathname);

  return (
    <div className={styles.appLayout}>
      <Navbar />
      
      <main className={styles.main}>
        {children}
      </main>

      <Footer />

      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      
      {isAuthModalOpen && (
        <AuthModal 
          initialMode={authModalMode}
          onClose={closeAuthModal}
        />
      )}
    </div>
  );
}
