import Sidebar from '../components/Sidebar';

export default function SignalsPage() {
  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>🎯</span> AI Signals
          </h1>
          <p className="text-sm text-slate-400 mt-1">Algorithmic entry and exit alerts evaluated by the Signal Agent.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold text-slate-300 uppercase">
            <span>Pair</span>
            <span>Type</span>
            <span>Entry</span>
            <span>Target</span>
            <span>Risk Status</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono py-2 text-slate-300">
            <span className="font-bold text-white">BTC/USDT</span>
            <span className="text-emerald-400 font-bold">LONG</span>
            <span>$63,350.00</span>
            <span>$64,100.00</span>
            <span className="text-emerald-400 font-semibold">APPROVED (Risk &lt; 1%)</span>
          </div>
        </div>
      </main>
    </Sidebar>
  );
}