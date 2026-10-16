'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showApp: boolean;
  setShowApp: (show: boolean) => void;
  isDashOpen: boolean;
  setIsDashOpen: (open: boolean) => void;
  isFocusMode: boolean;
  setIsFocusMode: (focus: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('editor');
  const [showApp, setShowApp] = useState(true);
  const [isDashOpen, setIsDashOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  return (
    <NavigationContext.Provider value={{ 
      activeTab, 
      setActiveTab, 
      showApp, 
      setShowApp,
      isDashOpen,
      setIsDashOpen,
      isFocusMode,
      setIsFocusMode
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
