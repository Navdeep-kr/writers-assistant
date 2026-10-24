'use client';

import React from 'react';
import LandingPage from '@/components/LandingPage';
import { useAuth } from '@/context/auth-context';

export default function HomePageClient() {
  const { openAuthModal } = useAuth();

  return (
    <LandingPage 
      onLogin={() => openAuthModal('login')} 
    />
  );
}
