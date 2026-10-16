'use client';

import React from 'react';
import LandingPage from '@/components/LandingPage';
import { useAuth } from '@/context/auth-context';

export default function Home() {
  const { openAuthModal } = useAuth();

  return (
    <LandingPage 
      onLogin={() => openAuthModal('login')} 
    />
  );
}
