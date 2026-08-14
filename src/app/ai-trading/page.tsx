'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import Link from 'next/link';

export default function AITradingPage() {
  const settings = useSettings();
  const [activeTab, setActiveTab] = useState<'agents' | 'guardrails' | 'logs'>('agents');

  const agents = [
    { id: 1, name: 'Alpha-Scanner Sub-Agent', status: 'Active', target: 'EUR/USD, GBP/USD', signal: 'Bullish Momentum', riskLevel: 'Low' },
    { id: 2, name: 'Risk-Enforcement Guardrail', status: 'Active', target: 'Capital Allocation Limits', signal: 'Max Drawdown: 1.5%', riskLevel: 'Strict' },
    { id: 3, name: 'Execution Gateway', status: 'Standby', target: 'API Order Router', signal: 'Awaiting Trigger', riskLevel: 'Moderate' },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation header back to dashboard */}
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Trading Sub-Agents</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Autonomous market indicator scanners and capital preservation guardrails.
            </p>
          </div>
          <Link href="/dashboard" className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg transition">
            Back to Dashboard
          </Link>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'agents' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
          >
            Sub-Agents Overview
          </button>
          <button
            onClick={() => setActiveTab('guardrails')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'guardrails' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
          >
            Risk Guardrails
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'logs' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
          >
            Live Execution Logs
          </button>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs px-2 py-1 bg-blue-950 text-blue-400 rounded border border-blue-800 font-mono">
                    {agent.status}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Risk: {agent.riskLevel}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{agent.name}</h3>
                <p className="text-sm text-zinc-400 mb-1">Target: {agent.target}</p>
                <p className="text-sm text-zinc-300 font-medium mt-4 pt-4 border-t border-zinc-800">
                  Signal: <span className="text-blue-400">{agent.signal}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'guardrails' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Unbreakable Risk Guardrails</h3>
            <div className="space-y-4 text-sm text-zinc-300">
              <div className="flex justify-between py-2 border-b border-zinc-800">
                <span>Maximum Daily Capital Drawdown Cap</span>
                <span className="font-mono text-blue-400">2.0%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800">
                <span>Autonomous Execution Lockout</span>
                <span className="font-mono text-emerald-400">Enabled</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Market Volatility Circuit Breaker</span>
                <span className="font-mono text-emerald-400">Active (Threshold: 4.5σ)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 font-mono text-xs text-zinc-400 space-y-2">
            <p className="text-zinc-500">[07:27:00 UTC] System initialized with secure settings context.</p>
            <p className="text-emerald-400">[07:27:05 UTC] Alpha-Scanner linked to primary feeds.</p>
            <p className="text-blue-400">[07:27:12 UTC] Risk guardrail protocols verified. Capital protection active.</p>
          </div>
        )}
      </div>
    </main>
  );
}