'use client';

import Sidebar from '../components/Sidebar';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Overall Win Rate', value: '68.4%', change: '+4.2% this week', color: 'text-emerald-400' },
    { label: 'Total Realized PnL', value: '+$142.80', change: 'Demo + Live Combined', color: 'text-emerald-400' },
    { label: 'Avg Risk-to-Reward', value: '1 : 2.4', change: 'Enforced by Risk Guard', color: 'text-cyan-400' },
    { label: 'Agent Approval Rate', value: '82.1%', change: '17.9% Volatility Rejections', color: 'text-purple-400' },
  ];

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>📊</span> Algorithmic Performance Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Deep-dive metrics evaluating Signal Agent accuracy and Risk Guard capital protection.
          </p>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{m.label}</span>
              <div className={`text-2xl font-bold mt-2 font-mono ${m.color}`}>{m.value}</div>
              <span className="text-[10px] text-slate-500 mt-1 block">{m.change}</span>
            </div>
          ))}
        </div>

        {/* Agent Performance Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Multi-Agent Efficiency Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold">Signal Agent</div>
              <div className="text-slate-300">Total Signals Generated: <strong>142</strong></div>
              <div className="text-slate-400">High-Confidence (&gt;75%): <strong>89</strong></div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold">Risk Guard Agent</div>
              <div className="text-slate-300">Trades Approved: <strong>116</strong></div>
              <div className="text-slate-400">High-Volatility Blocks: <strong>26</strong></div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-purple-400 font-bold">Execution Engine</div>
              <div className="text-slate-300">Avg Execution Time: <strong>1.2s</strong></div>
              <div className="text-slate-400">Slippage Tolerance: <strong>&lt; 0.05%</strong></div>
            </div>
          </div>
        </div>
      </main>
    </Sidebar>
  );
}