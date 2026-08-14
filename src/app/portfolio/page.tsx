'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useSettings } from '@/context/SettingsContext';

export default function PortfolioPage() {
  const { demoBalance } = useSettings();
  const [mounted, setMounted] = useState(false);

  // Simulated metrics matching your trading terminal state
  const btcHoldings = 0.001245; // Example current BTC hold
  const btcPrice = 63581.46;
  const btcValueInUsdt = btcHoldings * btcPrice;
  const totalNetWorth = demoBalance + btcValueInUsdt;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>💰</span> Portfolio & Asset Distribution
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time breakdown of your liquidity, active crypto holdings, and total net worth.
            </p>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Net Worth</span>
            <div className="text-3xl font-bold mt-2 font-mono text-cyan-400">
              ${mounted ? totalNetWorth.toFixed(2) : '0.00'}
            </div>
            <span className="text-[10px] text-emerald-400 block mt-1 font-mono">+0.0% Today</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">USDT Cash Balance</span>
            <div className="text-3xl font-bold mt-2 font-mono text-emerald-400">
              ${mounted ? demoBalance.toFixed(2) : '0.00'}
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">Ready for deployment</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">BTC Asset Value</span>
            <div className="text-3xl font-bold mt-2 font-mono text-amber-300">
              ${mounted ? btcValueInUsdt.toFixed(2) : '0.00'}
            </div>
            <span className="text-[10px] text-amber-400 block mt-1 font-mono">{btcHoldings} BTC Secured</span>
          </div>
        </div>

        {/* Asset Breakdown Table */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            📊 Asset Allocation
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4">Asset</th>
                  <th className="py-3 px-4">Holdings</th>
                  <th className="py-3 px-4">Market Price</th>
                  <th className="py-3 px-4">Total Value (USDT)</th>
                  <th className="py-3 px-4">Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr>
                  <td className="py-4 px-4 flex items-center gap-2 font-bold text-emerald-400">
                    <span>💵</span> Tether (USDT)
                  </td>
                  <td className="py-4 px-4">${mounted ? demoBalance.toFixed(2) : '0.00'}</td>
                  <td className="py-4 px-4">$1.00</td>
                  <td className="py-4 px-4">${mounted ? demoBalance.toFixed(2) : '0.00'}</td>
                  <td className="py-4 px-4 text-cyan-400">
                    {totalNetWorth > 0 ? ((demoBalance / totalNetWorth) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 flex items-center gap-2 font-bold text-amber-400">
                    <span>🪙</span> Bitcoin (BTC)
                  </td>
                  <td className="py-4 px-4">{btcHoldings} BTC</td>
                  <td className="py-4 px-4">${btcPrice.toFixed(2)}</td>
                  <td className="py-4 px-4">${btcValueInUsdt.toFixed(2)}</td>
                  <td className="py-4 px-4 text-cyan-400">
                    {totalNetWorth > 0 ? ((btcValueInUsdt / totalNetWorth) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Sidebar>
  );
}