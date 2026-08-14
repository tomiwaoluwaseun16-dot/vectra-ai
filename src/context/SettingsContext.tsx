'use client';

import React, { createContext, useContext, useState } from 'react';

interface SettingsContextType {
  demoBalance: number;
  setDemoBalance: (val: number) => void;
  demoTradeCap: number;
  setDemoTradeCap: (val: number) => void;
  liveTradeCap: number;
  setLiveTradeCap: (val: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [demoBalance, setDemoBalance] = useState(100.00); // Default set to $100
  const [demoTradeCap, setDemoTradeCap] = useState(10.00);  // $10 per trade
  const [liveTradeCap, setLiveTradeCap] = useState(10.00);  // $10 live limit

  return (
    <SettingsContext.Provider
      value={{
        demoBalance,
        setDemoBalance,
        demoTradeCap,
        setDemoTradeCap,
        liveTradeCap,
        setLiveTradeCap,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}