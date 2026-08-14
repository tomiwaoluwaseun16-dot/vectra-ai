'use client';

import Sidebar from '../components/Sidebar';

export default function DashboardPage() {
  const newsHeadlines = [
    { title: 'Bitcoin Holds Support Above $63k Ahead of Key CPI Inflation Release', time: '12m ago', source: 'CoinDesk', tag: 'BTC' },
    { title: 'Ethereum Stabilizes Near $1,900 as Institutional Staking Vaults Expand', time: '45m ago', source: 'CoinTelegraph', tag: 'ETH' },
    { title: 'AI-Driven Algorithmic Trading Engines See 34% Increase in On-Chain Volume', time: '2h ago', source: 'Bloomberg Crypto', tag: 'AI' },
    { title: 'Presale Capital Surges for Automated Crypto Execution Infrastructure', time: '4h ago', source: 'Reuters', tag: 'MARKETS' },
  ];

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>🏠</span> Dashboard Overview
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Live market dynamics, portfolio metrics, and breaking Bitcoin news.
            </p>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Multi-Agent Engine</span>
            <div className="text-2xl font-bold text-emerald-400 mt-2 font-mono">ONLINE</div>
            <span className="text-[10px] text-slate-500 font-semibold">Risk Guard Active</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Bitcoin Price</span>
            <div className="text-2xl font-bold text-white mt-2 font-mono">$63,377.70</div>
            <span className="text-[10px] text-emerald-400 font-semibold">+0.21% 24h</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Market Sentiment</span>
            <div className="text-2xl font-bold text-amber-400 mt-2">37 / 100</div>
            <span className="text-[10px] text-slate-400">Fear Zone</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Signals</span>
            <div className="text-2xl font-bold text-white mt-2 font-mono">4 Ready</div>
            <span className="text-[10px] text-cyan-400 font-semibold">High Accuracy</span>
          </div>
        </div>

        {/* Grid: Main Chart (Left) + Bitcoin & Crypto News Feed (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col h-[480px]">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span>📈</span> Bitcoin / Tether Live Chart
              </span>
              <span className="text-xs text-cyan-400 font-mono">Binance: BTCUSDT</span>
            </div>

            <div className="w-full flex-1 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_1&symbol=BINANCE%3ABTCUSDT&interval=15&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=0a0d14&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC"
                className="w-full h-full border-0"
                title="TradingView Main Chart"
              ></iframe>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📰</span> Bitcoin & Crypto News
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">LIVE</span>
              </div>

              <div className="mt-4 space-y-3">
                {newsHeadlines.map((news, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                        {news.tag}
                      </span>
                      <span className="text-[10px] text-slate-500">{news.time}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-snug hover:text-cyan-400 transition-colors cursor-pointer">
                      {news.title}
                    </p>
                    <span className="text-[10px] text-slate-500 mt-2 block">{news.source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Sidebar>
  );
}