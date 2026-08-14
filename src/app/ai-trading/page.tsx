'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useSettings } from '@/context/SettingsContext';

interface TerminalLog {
  id: string;
  time: string;
  tag: 'SIGNAL' | 'RISK' | 'EXEC' | 'SYSTEM' | 'ERROR';
  text: string;
  type?: 'BUY' | 'SELL';
}

interface Position {
  id: string;
  entryPrice: number;
  amountBtc: number;
  costUsdt: number;
}

export default function AITradingPage() {
  const {
    demoBalance,
    setDemoBalance,
    demoTradeCap,
    liveTradeCap,
  } = useSettings();

  const [mounted, setMounted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'DEMO' | 'LIVE'>('DEMO');

  // Asset Holdings & PnL
  const [btcHoldings, setBtcHoldings] = useState(0.00000000);
  const [totalPnl, setTotalPnl] = useState(0.00);

  // Active Positions tracking for Break-Even / No-Loss Guard
  const [positions, setPositions] = useState<Position[]>([]);

  // Market & Alert State
  const [btcPrice, setBtcPrice] = useState(63581.46);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);

  // Inter-Agent Pipeline State
  const [signalBias, setSignalBias] = useState<'NEUTRAL' | 'BULLISH' | 'BEARISH'>('NEUTRAL');
  const [signalConf, setSignalConf] = useState(0);
  const [riskStatus, setRiskStatus] = useState<'STANDBY' | 'APPROVED' | 'BLOCKED'>('STANDBY');
  const [lastExec, setLastExec] = useState<string>('NONE');

  const [logs, setLogs] = useState<TerminalLog[]>([]);

  // Whipsaw Prevention Counter
  const consecutiveSignalRef = useRef<{ action: 'BUY' | 'SELL' | null; count: number }>({
    action: null,
    count: 0,
  });

  // Current active trade cap based on Mode (DEMO vs LIVE)
  const activeTradeCap = mode === 'DEMO' ? demoTradeCap : liveTradeCap;

  useEffect(() => {
    setMounted(true);
    const now = new Date().toLocaleTimeString();
    setLogs([
      {
        id: '1',
        time: now,
        tag: 'SYSTEM',
        text: `Multi-Agent Engine online. Dynamic Capital linked: $${demoBalance.toFixed(2)} USDT available.`,
      },
      {
        id: '2',
        time: now,
        tag: 'RISK',
        text: 'Guards Active: Entry Tracking, Whipsaw Filter, and Profit-Only Sell Guard loaded.',
      },
    ]);
  }, []);

  const sendEmailAlert = async (action: string, price: string, amount: string, reason: string) => {
    if (!emailAlertsEnabled) return;
    try {
      const res = await fetch('/api/email-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, price, amount, reason }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok || data.error) {
        console.error('Resend API Error:', data.error);
        setLogs((prev) => [
          {
            id: Math.random().toString(),
            time: new Date().toLocaleTimeString(),
            tag: 'ERROR',
            text: `Email Alert Error: ${data.error?.message || 'Check Resend configuration.'}`,
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error('Failed to send email alert:', err);
    }
  };

  // Execution Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        // 1. Tick Price Simulation
        const priceDelta = (Math.random() - 0.48) * 35;
        const newPrice = Math.max(10000, btcPrice + priceDelta);
        setBtcPrice(newPrice);

        const timeStr = new Date().toLocaleTimeString();

        // 2. Chance to Generate Signal
        if (Math.random() < 0.40) {
          const rawIsBuy = positions.length === 0 ? true : Math.random() > 0.50;
          const rawAction = rawIsBuy ? 'BUY' : 'SELL';

          // --- GUARD 1: Whipsaw Filter ---
          if (consecutiveSignalRef.current.action === rawAction) {
            consecutiveSignalRef.current.count += 1;
          } else {
            consecutiveSignalRef.current = { action: rawAction, count: 1 };
          }

          if (consecutiveSignalRef.current.count < 2) {
            setSignalBias(rawIsBuy ? 'BULLISH' : 'BEARISH');
            setSignalConf(65);
            setRiskStatus('STANDBY');
            setLogs((prev) => [
              {
                id: Math.random().toString(),
                time: timeStr,
                tag: 'SIGNAL',
                text: `Potential ${rawAction} signal detected. Awaiting 2nd confirmation tick to avoid whipsaw.`,
              },
              ...prev,
            ]);
            return;
          }

          const action = rawAction;
          const conf = Math.floor(Math.random() * 20) + 80;
          const tradeSizeUsdt = activeTradeCap;
          const btcAmount = tradeSizeUsdt / newPrice;

          setSignalBias(action === 'BUY' ? 'BULLISH' : 'BEARISH');
          setSignalConf(conf);

          if (action === 'BUY') {
            if (demoBalance < tradeSizeUsdt) {
              setRiskStatus('BLOCKED');
              setLogs((prev) => [
                {
                  id: Math.random().toString(),
                  time: timeStr,
                  tag: 'RISK',
                  text: `Trade Blocked: Insufficient USDT ($${demoBalance.toFixed(2)} available, need $${tradeSizeUsdt.toFixed(2)}).`,
                },
                ...prev,
              ]);
              return;
            }

            // Execute BUY
            setRiskStatus('APPROVED');
            setDemoBalance(demoBalance - tradeSizeUsdt);
            setBtcHoldings((prev) => prev + btcAmount);

            const newPos: Position = {
              id: Math.random().toString(),
              entryPrice: newPrice,
              amountBtc: btcAmount,
              costUsdt: tradeSizeUsdt,
            };
            setPositions((prev) => [...prev, newPos]);

            setLastExec(`BUY BTC @ $${newPrice.toFixed(2)}`);

            const reasonText = `Confirmed 2-tick ${conf}% bullish signal. Purchased ${btcAmount.toFixed(6)} BTC. Entry recorded.`;
            setLogs((prev) => [
              {
                id: Math.random().toString(),
                time: timeStr,
                tag: 'EXEC',
                text: `[BUY] Bought $${tradeSizeUsdt.toFixed(2)} BTC (${btcAmount.toFixed(6)} BTC) @ $${newPrice.toFixed(2)}`,
                type: 'BUY',
              },
              ...prev,
            ]);

            sendEmailAlert('BUY', `$${newPrice.toFixed(2)}`, `$${tradeSizeUsdt.toFixed(2)}`, reasonText);
          } else {
            // --- GUARD 2: Profit / Break-Even Guard ---
            if (positions.length === 0) return;

            const oldestPos = positions[0];
            const requiredMinPrice = oldestPos.entryPrice * 1.0025; // 0.25% fee buffer

            if (newPrice < requiredMinPrice) {
              setRiskStatus('BLOCKED');
              setLogs((prev) => [
                {
                  id: Math.random().toString(),
                  time: timeStr,
                  tag: 'RISK',
                  text: `[HOLD GUARD] Sell blocked @ $${newPrice.toFixed(2)}. Target is $${requiredMinPrice.toFixed(2)} (Entry: $${oldestPos.entryPrice.toFixed(2)} + Fee Buffer). Safely holding.`,
                },
                ...prev,
              ]);
              return;
            }

            // Execute SELL
            setRiskStatus('APPROVED');
            const returnUsdt = oldestPos.amountBtc * newPrice;
            const pnl = returnUsdt - oldestPos.costUsdt;

            setBtcHoldings((prev) => Math.max(0, prev - oldestPos.amountBtc));
            setDemoBalance(demoBalance + returnUsdt);
            setTotalPnl((prev) => prev + pnl);
            setPositions((prev) => prev.slice(1));

            setLastExec(`SELL BTC @ $${newPrice.toFixed(2)} (+$${pnl.toFixed(2)})`);

            const reasonText = `Confirmed sell signal @ $${newPrice.toFixed(2)}. Met target price above entry ($${oldestPos.entryPrice.toFixed(2)}). Profit: +$${pnl.toFixed(2)}.`;

            setLogs((prev) => [
              {
                id: Math.random().toString(),
                time: timeStr,
                tag: 'EXEC',
                text: `[SELL] Sold Position @ $${newPrice.toFixed(2)} | Realized Profit: +$${pnl.toFixed(2)}`,
                type: 'SELL',
              },
              ...prev,
            ]);

            sendEmailAlert('SELL', `$${newPrice.toFixed(2)}`, `$${returnUsdt.toFixed(2)}`, reasonText);
          }
        }
      }, 3000);
    } else {
      setSignalBias('NEUTRAL');
      setSignalConf(0);
      setRiskStatus('STANDBY');
    }

    return () => clearInterval(interval);
  }, [isRunning, btcPrice, demoBalance, positions, activeTradeCap, emailAlertsEnabled, setDemoBalance]);

  const btcValueInUsdt = btcHoldings * btcPrice;
  const totalNetWorth = demoBalance + btcValueInUsdt;

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>⚡</span> AI Trading Terminal
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Guarded Execution Engine: Dynamic Capital, Whipsaw Filter & Cost-Basis Guard Active.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setMode('DEMO')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'DEMO'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🎮 DEMO MODE (${demoTradeCap}/trade)
            </button>
            <button
              onClick={() => setMode('LIVE')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'LIVE'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🔴 LIVE TRADING (${liveTradeCap}/trade)
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">USDT Cash</span>
            <div className="text-2xl font-bold mt-2 font-mono text-emerald-400">
              ${mounted ? demoBalance.toFixed(2) : '0.00'}
            </div>
            <span className="text-[10px] text-slate-500 block mt-1">Available Liquidity</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-amber-500/30 bg-amber-500/5">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <span>🪙</span> BTC Holdings
            </span>
            <div className="text-xl font-bold mt-2 font-mono text-amber-300">
              {mounted ? btcHoldings.toFixed(6) : '0.000000'} <span className="text-xs text-amber-400">BTC</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1 font-mono">
              ≈ ${btcValueInUsdt.toFixed(2)} USDT
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Net Value</span>
            <div className="text-2xl font-bold mt-2 font-mono text-cyan-400">${totalNetWorth.toFixed(2)}</div>
            <span className={`text-[10px] font-mono block mt-1 ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              Realized PnL: {totalPnl >= 0 ? `+$${totalPnl.toFixed(2)}` : `-$${Math.abs(totalPnl).toFixed(2)}`}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">BTC / USDT Price</span>
            <div className="text-2xl font-bold mt-2 font-mono text-white">${btcPrice.toFixed(2)}</div>
            <span className="text-[10px] text-slate-500 block mt-1">Real-Time Tick</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Open Positions</span>
            <div className="text-2xl font-bold mt-2 font-mono text-purple-400">{positions.length}</div>
            <span className="text-[10px] text-slate-500 block mt-1">Protected Positions</span>
          </div>
        </div>

        {/* Inter-Agent Network */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              🤖 Multi-Agent Inter-Communication Network
            </h3>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                isRunning
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isRunning ? 'PIPELINE ACTIVE' : 'PIPELINE PAUSED'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold flex justify-between">
                <span>AGENT 1: SIGNAL ANALYZER</span>
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
              </div>
              <div className="text-white text-sm font-bold">{isRunning ? signalBias : 'IDLE'}</div>
              <div className="text-slate-400">
                Bias: <strong className="text-white">{signalBias}</strong> | Conf: <strong className="text-cyan-400">{signalConf}%</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold flex justify-between">
                <span>AGENT 2: RISK GUARD</span>
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
              </div>
              <div className="text-white text-sm font-bold">{riskStatus}</div>
              <div className="text-slate-400">
                Cap: <strong className="text-white">${activeTradeCap}</strong> | Guard: <strong className="text-emerald-400">NO-LOSS SELL</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-purple-400 font-bold flex justify-between">
                <span>AGENT 3: EXECUTION ENGINE</span>
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-purple-400 animate-ping' : 'bg-slate-600'}`} />
              </div>
              <div className="text-white text-sm font-bold">{isRunning ? 'SCANNING' : 'IDLE'}</div>
              <div className="text-slate-400">
                Last: <strong className="text-purple-300">{lastExec}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Engine Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg font-mono ${
              isRunning
                ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {isRunning ? '⏹ STOP MULTI-AGENT LOOP' : '▶ START MULTI-AGENT LOOP'}
          </button>

          <button
            onClick={() => setEmailAlertsEnabled(!emailAlertsEnabled)}
            className={`w-full py-4 rounded-2xl font-bold text-xs transition-all font-mono border ${
              emailAlertsEnabled
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            {emailAlertsEnabled ? '📧 RESEND EMAIL ALERTS: ENABLED' : '📧 EMAIL ALERTS: MUTED'}
          </button>
        </div>

        {/* Console */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            💻 REAL-TIME MULTI-AGENT TERMINAL CONSOLE
          </h3>

          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 font-mono text-xs space-y-2 max-h-80 overflow-y-auto">
            {mounted &&
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <span className="text-slate-600 shrink-0">{log.time}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      log.tag === 'EXEC'
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : log.tag === 'RISK'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : log.tag === 'SIGNAL'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : log.tag === 'ERROR'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {log.tag}
                  </span>
                  <span
                    className={`flex-1 ${
                      log.type === 'BUY'
                        ? 'text-emerald-400 font-bold'
                        : log.type === 'SELL'
                        ? 'text-rose-400 font-bold'
                        : log.tag === 'ERROR'
                        ? 'text-rose-400'
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