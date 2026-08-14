import Sidebar from '../components/Sidebar';

export default function MarketsPage() {
  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>📈</span> Markets
          </h1>
          <p className="text-sm text-slate-400 mt-1">Real-time cryptocurrency ticker prices and volume data.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 h-[550px] flex flex-col">
          <iframe
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_markets&symbol=BINANCE%3ABTCUSDT&interval=60&theme=dark&style=1"
            className="w-full h-full border-0 rounded-xl"
            title="Markets Chart"
          ></iframe>
        </div>
      </main>
    </Sidebar>
  );
}