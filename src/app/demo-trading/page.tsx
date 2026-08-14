'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface Position {
  id: number;
  symbol: string;
  type: string;
  entryPrice: number;
  amount: number;
  timestamp: string;
}

interface AgentLog {
  id: number;
  agent: 'SIGNAL' | 'RISK' | 'EXECUTION' | 'SYSTEM';
  text: string;
  timestamp: string;
  status?: 'success' | 'danger' | 'info' | 'warning';
}

export default function AITradingPage() {
  const [mounted, setMounted] = useState(false);

  // Mode Switcher State
  const [tradingMode, setTradingMode] = useState<'demo' | 'live'>('demo');

  // User Configurable Safety Limits (AI cannot override this)
  const [maxLiveTradeSize, setMaxLiveTradeSize] = useState<number>(10.0);
  const [isEditingLimit, setIsEditingLimit] = useState(false);
  const [tempLimit, setTempLimit] = useState('10');

  // Balances
  const [demoBalance, setDemoBalance] = useState(10000.0);
  const [liveBalance] = useState(0.0);
  const [btcPrice, setBtcPrice] = useState(63380.0);

  // Multi-Agent Pipeline Telemetry
  const [aiRunning, setAiRunning] = useState(false);
  const [signalAgentData, setSignalAgentData] = useState({
    status: 'IDLE',
    lastBias: 'NEUTRAL',
    confidence: 0,
  });
  const [riskAgentData, setRiskAgentData] = useState({
    status: 'STANDBY',
    volatilityScore: 'LOW',
    verdict: 'PASSIVE',
  });
  const [executionAgentData, setExecutionAgentData] = useState({
    status: 'IDLE',
    lastExecuted: 'NONE',
  });

  const [positions, setPositions] = useState<Position[]>([]);
  const [logs, setLogs] = useState<AgentLog[]>([]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const initialTime = new Date().toLocaleTimeString();
    setLogs([
      {
        id: 1,
        agent: 'SYSTEM',
        text: 'Multi-Agent Network Initialized. Signal, Risk Guard, and Execution engines connected.',
        timestamp: initialTime,
        status: 'info',
      },
      {
        id: 2,
        agent: 'RISK',
        text: `Risk Guard Loaded: Demo Min Trade $100.00 | Live Strict Auto Trade Ceiling: $${maxLiveTradeSize.toFixed(2)}.`,
        timestamp: initialTime,
        status: 'warning',
      },
    ]);
  }, []);

  // Live Price Tick Simulator
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.495) * 18;
      setBtcPrice((prev) => Math.max(10000, prev + delta));
    }, 1500);
    return () => clearInterval(interval);
  }, [mounted]);

  // Multi-Agent Collaboration Loop
  useEffect(() => {
    if (!aiRunning || !mounted) return;

    const interval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString();

      // Determine Trade Sizing Rules: Demo ($100 min) vs Live ($10 default / user cap)
      const currentTradeSize = tradingMode === 'demo' ? 100.0 : maxLiveTradeSize;

      // STEP 1: SIGNAL AGENT
      setSignalAgentData({ status: 'ANALYZING MARKET...', lastBias: 'SCANNING', confidence: 0 });

      setTimeout(() => {
        const biases = ['BULLISH', 'BEARISH', 'NEUTRAL'];
        const chosenBias = biases[Math.floor(Math.random() * biases.length)];
        const confidence = Math.floor(Math.random() * 35) + 60;

        setSignalAgentData({
          status: 'INTEL EMITTED',
          lastBias: chosenBias,
          confidence,
        });

        if (chosenBias === 'NEUTRAL') {
          setLogs((prev) => [
            {
              id: Date.now(),
              agent: 'SIGNAL',
              text: `Market structure neutral (Confidence: ${confidence}%). No setup passed to Risk Guard.`,
              timestamp: timeStr,
              status: 'info',
            },
            ...prev.slice(0, 40),
          ]);
          setRiskAgentData({ status: 'STANDBY', volatilityScore: 'LOW', verdict: 'NO ACTION' });
          return;
        }

        setLogs((prev) => [
          {
            id: Date.now(),
            agent: 'SIGNAL',
            text: `Emitted ${chosenBias} signal for BTC/USDT with ${confidence}% confidence score. Handing off to Risk Guard...`,
            timestamp: timeStr,
            status: 'info',
          },
          ...prev.slice(0, 40),
        ]);

        // STEP 2: RISK GUARD AGENT
        setTimeout(() => {
          setRiskAgentData({ status: 'EVALUATING RISK GATES...', volatilityScore: 'SCANNING', verdict: 'CHECKING' });

          const isHighVolatility = Math.random() > 0.65;
          const currentBal = tradingMode === 'demo' ? demoBalance : liveBalance;

          if (currentBal < currentTradeSize) {
            setRiskAgentData({ status: 'REJECTED', volatilityScore: 'HIGH', verdict: 'REJECTED (LOW BAL)' });
            setLogs((prev) => [
              {
                id: Date.now(),
                agent: 'RISK',
                text: `🔴 REJECTED ${chosenBias} trade: Balance ($${currentBal.toFixed(2)}) is lower than mandatory $${currentTradeSize.toFixed(2)} limit.`,
                timestamp: timeStr,
                status: 'danger',
              },
              ...prev.slice(0, 40),
            ]);
            return;
          }

          if (isHighVolatility) {
            setRiskAgentData({ status: 'REJECTED', volatilityScore: 'EXTREME', verdict: 'REJECTED (VOLATILITY)' });
            setLogs((prev) => [
              {
                id: Date.now(),
                agent: 'RISK',
                text: `🔴 REJECTED ${chosenBias} trade: Risk Guard detected elevated volatility spike. Enforcing capital protection.`,
                timestamp: timeStr,
                status: 'danger',
              },
              ...prev.slice(0, 40),
            ]);
            return;
          }

          // Approved by Risk Guard
          setRiskAgentData({ status: 'APPROVED ✓', volatilityScore: 'NORMAL', verdict: 'CLEAR TO EXECUTE' });
          setLogs((prev) => [
            {
              id: Date.now(),
              agent: 'RISK',
              text: `🟢 APPROVED: Handing off order sizing of $${currentTradeSize.toFixed(2)} to Execution Engine...`,
              timestamp: timeStr,
              status: 'success',
            },
            ...prev.slice(0, 40),
          ]);

          // STEP 3: EXECUTION AGENT
          setTimeout(() => {
            setExecutionAgentData({ status: 'EXECUTING...', lastExecuted: 'IN PROGRESS' });

            const tradeType = chosenBias === 'BULLISH' ? 'BUY / LONG' : 'SELL / SHORT';

            if (tradingMode === 'demo') {
              setDemoBalance((prev) => prev - currentTradeSize);
              const newPos: Position = {
                id: Date.now(),
                symbol: 'BTC/USDT',
                type: tradeType,
                entryPrice: btcPrice,
                amount: currentTradeSize,
                timestamp: timeStr,
              };

              setPositions((prev) => [newPos, ...prev]);
              setExecutionAgentData({ status: 'SUCCESS', lastExecuted: `${tradeType} @ $${btcPrice.toFixed(2)}` });
              setLogs((prev) => [
                {
                  id: Date.now(),
                  agent: 'EXECUTION',
                  text: `⚡ EXECUTED DEMO ${tradeType} $${currentTradeSize.toFixed(2)} BTC/USDT at $${btcPrice.toFixed(2)}.`,
                  timestamp: timeStr,
                  status: 'success',
                },
                ...prev.slice(0, 40),
              ]);
            } else {
              setExecutionAgentData({ status: 'AWAITING WALLET', lastExecuted: 'LIVE PAUSED' });
              setLogs((prev) => [
                {
                  id: Date.now(),
                  agent: 'EXECUTION',
                  text: `⚠️ LIVE MODE: Enforcing user trade cap of $${currentTradeSize.toFixed(2)}. Waiting for automated funding trigger.`,
                  timestamp: timeStr,
                  status: 'warning',
                },
                ...prev.slice(0, 40),
              ]);
            }

            setTimeout(() => {
              setExecutionAgentData({ status: 'IDLE', lastExecuted: `${tradeType}` });
            }, 2000);
          }, 1200);
        }, 1200);
      }, 1000);
    }, 7000);

    return () => clearInterval(interval);
  }, [aiRunning, tradingMode, demoBalance, liveBalance, btcPrice, mounted, maxLiveTradeSize]);

  const handleUpdateLiveLimit = () => {
    const val = parseFloat(tempLimit);
    if (!isNaN(val) && val > 0) {
      setMaxLiveTradeSize(val);
      setIsEditingLimit(false);
      const timeStr = new Date().toLocaleTimeString();
      setLogs((prev) => [
        {
          id: Date.now(),
          agent: 'SYSTEM',
          text: `🛡️ USER OVERRIDE: Live trade maximum limit updated by User to $${val.toFixed(2)}. AI is locked to this ceiling.`,
          timestamp: timeStr,
          status: 'info',
        },
        ...prev,
      ]);
    }
  };

  if (!mounted) {
    return (
      <Sidebar>
        <div className="p-6 text-slate-400 font-mono text-xs">Initializing terminal interface...</div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Header & Mode Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>⚡</span> AI Trading Terminal
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Multi-agent automated execution guarded by strict user-set risk controls.
            </p>
          </div>

          {/* DEMO ↔ LIVE SWITCH */}
          <div className="flex items-center gap-3 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setTradingMode('demo')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                tradingMode === 'demo'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🎮 DEMO MODE ($100 Min Trade)
            </button>
            <button
              onClick={() => setTradingMode('live')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                tradingMode === 'live'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🔴 LIVE TRADING ($10 Default Cap)
            </button>
          </div>
        </div>

        {/* Dynamic Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {tradingMode === 'demo' ? 'Demo Balance' : 'Live Balance'}
            </span>
            <div className="text-2xl font-bold text-white mt-2 font-mono">
              ${tradingMode === 'demo' ? demoBalance.toFixed(2) : liveBalance.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-500">{tradingMode === 'demo' ? 'Virtual USDT' : 'Real USDT'}</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">BTC / USDT Price</span>
            <div className="text-2xl font-bold text-cyan-400 mt-2 font-mono">${btcPrice.toFixed(2)}</div>
            <span className="text-[10px] text-emerald-400">Real-Time Simulation Tick</span>
          </div>

          {/* USER CONTROLLED TRADING CEILING CARD */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {tradingMode === 'demo' ? 'Demo Order Size' : 'User Live Trade Cap'}
              </span>
              <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
                ${tradingMode === 'demo' ? '100.00' : maxLiveTradeSize.toFixed(2)}
              </div>
            </div>

            {tradingMode === 'live' && (
              <div className="mt-2">
                {isEditingLimit ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={tempLimit}
                      onChange={(e) => setTempLimit(e.target.value)}
                      className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                    />
                    <button
                      onClick={handleUpdateLiveLimit}
                      className="px-2 py-1 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditingLimit(true)}
                    className="text-[10px] text-cyan-400 underline font-mono hover:text-cyan-300"
                  >
                    ✏️ Edit User Limit
                  </button>
                )}
              </div>
            )}
            {tradingMode === 'demo' && <span className="text-[10px] text-slate-500">Fixed $100.00 Demo Trades</span>}
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Open Positions</span>
            <div className="text-2xl font-bold text-white mt-2 font-mono">{positions.length}</div>
            <span className="text-[10px] text-slate-500">Active Executed Trades</span>
          </div>
        </div>

        {/* REAL-TIME MULTI-AGENT TELEMETRY DASHBOARD */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span>🤖</span> Multi-Agent Inter-Communication Network
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {aiRunning ? 'PIPELINE ACTIVE' : 'PIPELINE PAUSED'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* AGENT 1: SIGNAL MONITOR */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500">Agent 1: Signal Analyzer</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>
              <div className="text-sm font-bold text-cyan-400">{signalAgentData.status}</div>
              <div className="text-xs text-slate-400 flex justify-between pt-1 border-t border-slate-900 font-mono">
                <span>Bias: <strong className="text-white">{signalAgentData.lastBias}</strong></span>
                <span>Conf: <strong className="text-cyan-400">{signalAgentData.confidence}%</strong></span>
              </div>
            </div>

            {/* AGENT 2: RISK GUARD */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500">Agent 2: Risk Guard</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div
                className={`text-sm font-bold ${
                  riskAgentData.status.includes('REJECTED') ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {riskAgentData.status}
              </div>
              <div className="text-xs text-slate-400 flex justify-between pt-1 border-t border-slate-900 font-mono">
                <span>Volatility: <strong className="text-white">{riskAgentData.volatilityScore}</strong></span>
                <span>Limit: <strong className="text-emerald-400">${tradingMode === 'demo' ? '100' : maxLiveTradeSize}</strong></span>
              </div>
            </div>

            {/* AGENT 3: EXECUTION TRADER */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500">Agent 3: Execution Engine</span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              </div>
              <div className="text-sm font-bold text-purple-400">{executionAgentData.status}</div>
              <div className="text-xs text-slate-400 pt-1 border-t border-slate-900 font-mono truncate">
                Last: <strong className="text-white">{executionAgentData.lastExecuted}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chart + Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span>📈</span> Live BTC/USDT Feed
              </span>
              <span className="text-xs text-cyan-400 font-mono">Real-time TradingView</span>
            </div>

            <div className="w-full flex-1 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_1&symbol=BINANCE%3ABTCUSDT&interval=1&theme=dark&style=1"
                className="w-full h-full border-0"
                title="TradingView Chart"
              ></iframe>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
              <h2 className="text-sm font-bold text-white">Multi-Agent Engine Controls</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Current Trading Mode: <strong className="text-cyan-400 uppercase">{tradingMode}</strong> (Size:{' '}
                <strong className="text-emerald-400">${tradingMode === 'demo' ? '100.00' : maxLiveTradeSize.toFixed(2)}</strong>)
              </p>

              <button
                onClick={() => setAiRunning(!aiRunning)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                  aiRunning
                    ? 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/20'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-slate-950 shadow-cyan-500/20'
                }`}
              >
                {aiRunning ? '■ STOP MULTI-AGENT LOOP' : '▶ START MULTI-AGENT ENGINE'}
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Recent Positions</span>
                <span className="text-[10px] text-cyan-400 font-mono">{positions.length} Total</span>
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {positions.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2">No trades executed yet in this session.</p>
                ) : (
                  positions.slice(0, 5).map((pos) => (
                    <div key={pos.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className={`font-bold block ${pos.type.includes('BUY') ? 'text-emerald-400' : 'text-red-400'}`}>
                          {pos.type}
                        </span>
                        <span className="text-[10px] text-slate-500">{pos.timestamp}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white block font-bold">${pos.amount.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400">@ ${pos.entryPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Console */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <span>💻</span> Real-Time Multi-Agent Terminal Console
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Auto-scrolling telemetry</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs h-56 overflow-y-auto space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 border-b border-slate-900/60 pb-1.5">
                <span className="text-[10px] text-slate-500 shrink-0 mt-0.5">{log.timestamp}</span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                    log.agent === 'SIGNAL'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : log.agent === 'RISK'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : log.agent === 'EXECUTION'
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {log.agent}
                </span>
                <span
                  className={`leading-relaxed ${
                    log.status === 'danger'
                      ? 'text-red-400'
                      : log.status === 'success'
                      ? 'text-emerald-400'
                      : log.status === 'warning'
                      ? 'text-amber-400'
                      : 'text-slate-300'
                  }`}
                >
                  {log.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Sidebar>
  );
}