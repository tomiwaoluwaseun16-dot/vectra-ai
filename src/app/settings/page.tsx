'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useSettings } from '@/context/SettingsContext';

export default function SettingsPage() {
  const {
    demoBalance,
    setDemoBalance,
    demoTradeCap,
    setDemoTradeCap,
    liveTradeCap,
    setLiveTradeCap,
  } = useSettings();

  const [tempBalance, setTempBalance] = useState(demoBalance.toString());
  const [tempDemoCap, setTempDemoCap] = useState(demoTradeCap.toString());
  const [tempLiveCap, setTempLiveCap] = useState(liveTradeCap.toString());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setDemoBalance(Math.max(0, Number(tempBalance) || 0));
    setDemoTradeCap(Math.max(1, Number(tempDemoCap) || 1));
    setLiveTradeCap(Math.max(1, Number(tempLiveCap) || 1));

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-4xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>⚙️</span> Platform & Capital Settings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure starting balances and execution trade ceilings for Demo and Live trading.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-sm">
            ✅ Settings saved successfully! Return to AI Trading Terminal to see updated capital limits.
          </div>
        )}

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider border-b border-slate-800 pb-3">
            🎮 Demo Capital & Trade Control
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                Demo Starting USDT Cash Balance ($)
              </label>
              <input
                type="number"
                value={tempBalance}
                onChange={(e) => setTempBalance(e.target.value)}
                placeholder="e.g. 100"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono font-bold focus:border-cyan-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Set any balance ($100, $500, unlimited).</span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                Demo Position Size per Trade ($)
              </label>
              <input
                type="number"
                value={tempDemoCap}
                onChange={(e) => setTempDemoCap(e.target.value)}
                placeholder="e.g. 10"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono font-bold focus:border-cyan-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Amount allocated for each demo order.</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-rose-400 font-mono uppercase tracking-wider border-b border-slate-800 pb-3">
            🔴 Live Capital & Risk Limit
          </h2>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
              Strict Live Auto Trade Ceiling ($)
            </label>
            <input
              type="number"
              value={tempLiveCap}
              onChange={(e) => setTempLiveCap(e.target.value)}
              placeholder="e.g. 10"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono font-bold focus:border-rose-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Max USDT spent per order when running on live API key.</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-xl font-bold font-mono text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20"
        >
          💾 SAVE CAPITAL & LIMIT SETTINGS
        </button>
      </main>
    </Sidebar>
  );
}