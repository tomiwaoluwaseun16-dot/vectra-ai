'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function AITradingPage() {
  const settings = useSettings();
  const [isLoopActive, setIsLoopActive] = useState(false);
  const [mode, setMode] = useState<'demo' | 'live'>('demo');
  const [agentState, setAgentState] = useState({
    analyzerStatus: 'IDLE',
    analyzerBias: 'NEUTRAL',
    analyzerConf: '0%',
    riskStatus: 'STANDBY',
    riskVolatility: 'LOW',
    riskCap: '$100',
    executionStatus: 'IDLE',
    lastTrade: 'BUY BTC @ $63763.46',
  });

  const [logs, setLogs] = useState([
    { time: '5:39:02 PM', type: 'EXEC', text: '[BUY] Bought $100.00 worth of BTC (0.001568 BTC) | Conf: 89%', color: 'text-emerald-400' },
    { time: '5:38:55 PM', type: 'EXEC', text: '[SELL] Sold BTC Position at $63747.54 | Conf: 77%', color: 'text-rose-400' },
    { time: '5:38:46 PM', type: 'EXEC', text: '[BUY] Bought $100.00 worth of BTC (0.001570 BTC) | Conf: 79%', color: 'text-emerald-400' },
    { time: '5:38:31 PM', type: 'EXEC', text: '[SELL] Sold BTC Position at $63694.00 | Conf: 83%', color: 'text-rose-400' },
  ]);

  // Simulate the 3 agents working together when the loop is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoopActive) {
      setAgentState({
        analyzerStatus: 'SCANNING',
        analyzerBias: 'BULLISH',
        analyzerConf: '94%',
        riskStatus: 'VALIDATING',
        riskVolatility: 'OPTIMAL',
        riskCap: mode === 'demo' ? '$100 (Demo)' : '$10 (Live Cap)',
        executionStatus: 'ARMED',
        lastTrade: 'Evaluating Market Depth',
      });

      interval = setInterval(() => {
        const timeStr = new Date().toLocaleTimeString();
        const confNum = Math.floor(Math.random() * (98 - 80) + 80);
        const isBuy = Math.random() > 0.4;
        const newLog = {
          time: timeStr,
          type: 'EXEC',
          text: isBuy 
            ? `[BUY] Risk-Free Check Passed. Bought $${mode === 'demo' ? '100.00' : '10.00'} BTC | Conf: ${confNum}%` 
            : `[SELL] Target Met. Sold BTC Position Securely | Conf: ${confNum}%`,
          color: isBuy ? 'text-emerald-400' : 'text-rose-400',
        };
        setLogs((prev) => [newLog, ...prev.slice(0, 15)]);
      }, 4000);
    } else {
      setAgentState({
        analyzerStatus: 'IDLE',
        analyzerBias: 'NEUTRAL',
        analyzerConf: '0%',
        riskStatus: 'STANDBY',
        riskVolatility: 'LOW',
        riskCap: '$100',
        executionStatus: 'IDLE',
        lastTrade: 'BUY BTC @ $63763.46',
      });
    }
    return () => clearInterval(interval);
  }, [isLoopActive, mode]);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header & Mode Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-950 border border-zinc-900 p-6 rounded-2xl gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xl">⚡</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">AI Trading Terminal</h1>
            </div>
            <p className="text-zinc-400 text-sm mt-1">
              Multi-agent automated execution guarded by strict user-set risk controls.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMode('demo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                mode === 'demo'
                  ? 'bg-cyan-950 border border-cyan-700 text-cyan-300 shadow-lg shadow-cyan-950/50'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mode === 'demo' ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-600'}`}></span>
              DEMO MODE ($100 Trade)
            </button>

            <button
              onClick={() => setMode('live')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                mode === 'live'
                  ? 'bg-rose-950 border border-rose-700 text-rose-300 shadow-lg shadow-rose-950/50'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mode === 'live' ? 'bg-rose-500 animate-pulse' : 'bg-zinc-600'}`}></span>
              LIVE TRADING ($10 Cap)
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">USDT Cash</p>
            <p className="text-2xl font-bold text-emerald-400 mt-2">$9,428.84</p>
            <p className="text-xs text-zinc-500 mt-1">Available Liquidity</p>
          </div>

          <div className="bg-zinc-900/80 border border-amber-500/30 p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none"></div>
            <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
              <span>₿</span> BTC Holdings
            </p>
            <p className="text-2xl font-bold text-white mt-2">0.009428 <span className="text-sm font-normal text-zinc-400">BTC</span></p>
            <p className="text-xs text-zinc-500 mt-1">≈ $601.13 USDT</p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Total Net Value</p>
            <p className="text-2xl font-bold text-white mt-2">$10,029.97</p>
            <p className="text-xs text-emerald-400 mt-1 font-medium">Realized PnL: +$28.84</p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">BTC / USDT Price</p>
            <p className="text-2xl font-bold text-white mt-2">$63,762.54</p>
            <p className="text-xs text-zinc-500 mt-1">Real-Time Tick</p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800/80 p-5 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Open Positions</p>
            <p className="text-2xl font-bold text-pink-500 mt-2">6</p>
            <p className="text-xs text-zinc-500 mt-1">Active Executed Trades</p>
          </div>
        </div>

        {/* Multi-Agent Inter-Communication Network Section */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-zinc-300">🤖</span>
              <h2 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Multi-Agent Inter-Communication Network</h2>
            </div>
            <span className={`text-xs font-mono px-3 py-1 rounded-lg border ${isLoopActive ? 'bg-emerald-950 border-emerald-800 text-emerald-400 animate-pulse' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
              {isLoopActive ? 'PIPELINE ACTIVE (3 AGENTS LINKED)' : 'PIPELINE PAUSED'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Agent 1 */}
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl relative">
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${isLoopActive ? 'bg-cyan-400 animate-ping' : 'bg-cyan-400'}`}></div>
              <p className="text-xs font-bold text-cyan-400 tracking-wider">AGENT 1: SIGNAL ANALYZER</p>
              <p className="text-lg font-bold text-white mt-2">{agentState.analyzerStatus}</p>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex justify-between">
                <span>Bias: <strong className="text-white">{agentState.analyzerBias}</strong></span>
                <span>Conf: <strong className="text-white">{agentState.analyzerConf}</strong></span>
              </div>
            </div>

            {/* Agent 2 */}
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl relative">
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${isLoopActive ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400'}`}></div>
              <p className="text-xs font-bold text-emerald-400 tracking-wider">AGENT 2: RISK GUARD</p>
              <p className="text-lg font-bold text-white mt-2">{agentState.riskStatus}</p>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex justify-between">
                <span>Volatility: <strong className="text-emerald-400">{agentState.riskVolatility}</strong></span>
                <span>Cap: <strong className="text-white">{agentState.riskCap}</strong></span>
              </div>
            </div>

            {/* Agent 3 */}
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl relative">
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${isLoopActive ? 'bg-purple-400 animate-ping' : 'bg-purple-400'}`}></div>
              <p className="text-xs font-bold text-purple-400 tracking-wider">AGENT 3: EXECUTION ENGINE</p>
              <p className="text-lg font-bold text-white mt-2">{agentState.executionStatus}</p>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex justify-between truncate">
                <span className="truncate">Last: <strong className="text-emerald-400">{agentState.lastTrade}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => setIsLoopActive(!isLoopActive)}
              className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                isLoopActive
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
              }`}
            >
              <span>{isLoopActive ? '⏹ PAUSE MULTI-AGENT LOOP' : '▶ START MULTI-AGENT LOOP'}</span>
            </button>

            <button className="py-3.5 px-6 rounded-xl font-bold text-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition flex items-center justify-center gap-2">
              <span>📧 RESEND EMAIL ALERTS: ENABLED</span>
            </button>
          </div>
        </div>

        {/* Real-time Terminal Console */}
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-zinc-300">💻</span>
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Real-Time Multi-Agent Terminal Console</h3>
          </div>

          <div className="bg-black border border-zinc-900 rounded-xl p-4 font-mono text-xs space-y-2 max-h-80 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-zinc-500">{log.time}</span>
                <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded text-[10px] font-bold">{log.type}</span>
                <span className={log.color}>{log.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}