'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'trades' | 'transfers'>('trades');

  const tradeHistory = [
    {
      id: 'TRD-9042',
      pair: 'BTC/USDT',
      type: 'BUY / LONG',
      mode: 'DEMO',
      entryPrice: '$63,380.00',
      exitPrice: '$63,850.00',
      size: '$100.00',
      pnl: '+$7.42',
      status: 'PROFIT',
      time: '15:42:10',
    },
    {
      id: 'TRD-9041',
      pair: 'BTC/USDT',
      type: 'SELL / SHORT',
      mode: 'LIVE',
      entryPrice: '$63,410.00',
      exitPrice: '$63,220.00',
      size: '$10.00',
      pnl: '+$0.30',
      status: 'PROFIT',
      time: '14:20:05',
    },
    {
      id: 'TRD-9040',
      pair: 'ETH/USDT',
      type: 'BUY / LONG',
      mode: 'DEMO',
      entryPrice: '$2,650.00',
      exitPrice: '$2,620.00',
      size: '$100.00',
      pnl: '-$1.13',
      status: 'LOSS',
      time: '11:05:44',
    },
  ];

  const transferHistory = [
    {
      id: 'TX-8821',
      type: 'DEPOSIT',
      method: 'Binance Pay (USDT)',
      amount: '+$500.00',
      status: 'COMPLETED',
      date: '2026-08-12 18:30',
    },
    {
      id: 'TX-8819',
      type: 'WITHDRAWAL',
      method: 'Crypto Wallet (TRC20)',
      amount: '-$150.00',
      status: 'COMPLETED',
      date: '2026-08-10 09:15',
    },
    {
      id: 'TX-8800',
      type: 'DEMO RELOAD',
      method: 'System Reset',
      amount: '+$10,000.00',
      status: 'COMPLETED',
      date: '2026-08-01 12:00',
    },
  ];

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>📜</span> Transaction & Trade History
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Complete audit log of executed trades, deposits, withdrawals, and realized PnL.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('trades')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'trades'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ Trade Executions
            </button>
            <button
              onClick={() => setActiveTab('transfers')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'transfers'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              💳 Deposits & Withdrawals
            </button>
          </div>
        </div>

        {/* Trade History View */}
        {activeTab === 'trades' && (
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Executed Orders Log
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                  <tr>
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Pair</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Mode</th>
                    <th className="pb-3">Entry</th>
                    <th className="pb-3">Exit</th>
                    <th className="pb-3">Size</th>
                    <th className="pb-3">Realized PnL</th>
                    <th className="pb-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {tradeHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 text-slate-400">{item.id}</td>
                      <td className="py-3 font-bold text-white">{item.pair}</td>
                      <td
                        className={`py-3 font-bold ${
                          item.type.includes('BUY') ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {item.type}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            item.mode === 'LIVE'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          }`}
                        >
                          {item.mode}
                        </span>
                      </td>
                      <td className="py-3">{item.entryPrice}</td>
                      <td className="py-3">{item.exitPrice}</td>
                      <td className="py-3 font-bold text-white">{item.size}</td>
                      <td
                        className={`py-3 font-bold ${
                          item.status === 'PROFIT' ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {item.pnl}
                      </td>
                      <td className="py-3 text-slate-500">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Deposits & Withdrawals View */}
        {activeTab === 'transfers' && (
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Capital Transfer Ledger
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                  <tr>
                    <th className="pb-3">Reference</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Method / Source</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {transferHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 text-slate-400">{item.id}</td>
                      <td className="py-3 font-bold text-white">{item.type}</td>
                      <td className="py-3 text-slate-400">{item.method}</td>
                      <td
                        className={`py-3 font-bold ${
                          item.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {item.amount}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </Sidebar>
  );
}