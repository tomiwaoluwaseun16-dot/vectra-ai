'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function AITradingPage() {
  // Safe consumption of settings context inside dynamic runtime
  const settings = useSettings();

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">AI Trading Sub-Agents</h1>
        <p className="text-zinc-400 mb-8">
          Managing autonomous market indicators and strict capital risk guardrails.
        </p>

        {/* Your active trading console UI goes here */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-500">System status: Active & Protected</p>
        </div>
      </div>
    </main>
  );
}