'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  // Simulated AI Reports and Banned Accounts managed by Sentinel & Reporter AI
  const [bannedAccounts, setBannedAccounts] = useState([
    { id: 'usr_9921', email: 'suspicious_bot_01@gmail.com', reason: 'Rapid-fire arbitrage exploit attempt', time: '12 mins ago' },
    { id: 'usr_4420', email: 'risk_bypass_tester@yahoo.com', reason: 'Attempted to override Vectra Guard capital cap', time: '3 hours ago' }
  ]);

  const [aiLogs, setAiLogs] = useState([
    { agent: 'Sentinel AI', action: 'Scanned 142 active trading sessions. Zero anomalies detected.', time: 'Just now' },
    { agent: 'Reporter AI', action: 'Compiled daily volume metrics: $4,280 processed successfully.', time: '1 hour ago' },
    { agent: 'Sentinel AI', action: 'Automatically blocked unauthorized API call from IP 192.168.1.45', time: '4 hours ago' }
  ]);

  useEffect(() => {
    // Check if admin is authenticated via local session flag
    const authFlag = localStorage.getItem('vectra_admin_auth');
    if (authFlag !== 'true') {
      router.push('/admin-login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('vectra_admin_auth');
    router.push('/');
  };

  const handleUnban = (id: string) => {
    setBannedAccounts(bannedAccounts.filter(acc => acc.id !== id));
  };

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white text-xs font-mono shadow-lg shadow-red-600/30">
            AI
          </div>
          <div>
            <h1 className="text-sm font-bold font-mono text-white tracking-tight">COMMAND CENTER // GENERALALESH</h1>
            <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI Agents Sentinel & Reporter: Active & Reporting
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono transition-all border border-slate-800"
        >
          Lock Command Room 🔒
        </button>
      </header>

      {/* Main Content Hub */}
      <main className="max-w-7xl mx-auto w-full p-8 space-y-8 flex-1">
        
        {/* Top Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 space-y-2">
            <div className="text-[10px] font-mono text-slate-500 uppercase">System Status</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">SECURE</div>
            <p className="text-[11px] text-slate-400">All guardrails fully functional.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 space-y-2">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Active AI Agents</div>
            <div className="text-2xl font-bold font-mono text-white">2 / 2</div>
            <p className="text-[11px] text-slate-400">Sentinel & Reporter online.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 space-y-2">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Fraud Detected & Banned</div>
            <div className="text-2xl font-bold font-mono text-red-400">{bannedAccounts.length} Users</div>
            <p className="text-[11px] text-slate-400">Handled automatically by Sentinel.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 space-y-2">
            <div className="text-[10px] font-mono text-slate-500 uppercase">Global Capital Flow</div>
            <div className="text-2xl font-bold font-mono text-cyan-400">$4,280.00</div>
            <p className="text-[11px] text-slate-400">Tracked across all user terminals.</p>
          </div>
        </div>

        {/* Two-Column Grid for AI Activity & Banned Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: AI Agent Live Reports */}
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <span>🤖</span> AI Sub-Agent Activity Stream
              </h2>
              <span className="text-[10px] font-mono text-slate-500">Live Reports</span>
            </div>

            <div className="space-y-3">
              {aiLogs.map((log, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-cyan-400">{log.agent}</span>
                    <span className="text-[10px] font-mono text-slate-500">{log.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">{log.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Fraud Enforcement / Banned Accounts */}
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <span>🛡️</span> Sentinel AI: Banned / Flagged Accounts
              </h2>
              <span className="text-[10px] font-mono text-red-400">{bannedAccounts.length} Blocked</span>
            </div>

            <div className="space-y-3">
              {bannedAccounts.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-slate-500">
                  No malicious activity detected. System is clean.
                </div>
              ) : (
                bannedAccounts.map((account) => (
                  <div key={account.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs font-bold font-mono text-white">{account.email}</div>
                      <div className="text-[10px] text-red-400 font-mono">{account.reason}</div>
                      <div className="text-[9px] text-slate-500 font-mono">Flagged: {account.time}</div>
                    </div>
                    <button
                      onClick={() => handleUnban(account.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] font-mono transition-all border border-slate-800"
                    >
                      Pardon / Unban
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}