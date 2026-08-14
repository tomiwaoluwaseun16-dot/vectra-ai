'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function JournalPage() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      pair: 'BTC/USDT',
      date: '2026-08-13',
      type: 'BUY / LONG',
      agentReason: 'Signal Agent caught 15m bullish divergence; Risk Guard verified clean volatility.',
      userNote: 'Perfect execution during London open session.',
    },
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes([
      {
        id: Date.now(),
        pair: 'BTC/USDT',
        date: new Date().toISOString().split('T')[0],
        type: 'MANUAL ENTRY',
        agentReason: 'User added manual reflection.',
        userNote: newNote,
      },
      ...notes,
    ]);
    setNewNote('');
  };

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>📒</span> Automated Trade Journal
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review agent execution logs and record personal insights on market behavior.
          </p>
        </div>

        {/* Add Note Input */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Add Manual Journal Note</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="e.g. Market spike post-CPI news. Risk Guard protected $10 cap..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
            <button
              onClick={handleAddNote}
              className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
            >
              Log Note
            </button>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          {notes.map((entry) => (
            <div key={entry.id} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-cyan-400">{entry.pair} — {entry.type}</span>
                <span className="text-slate-500">{entry.date}</span>
              </div>
              <p className="text-xs text-slate-400">🤖 <strong>Agent Context:</strong> {entry.agentReason}</p>
              <p className="text-xs text-white bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono">
                📝 {entry.userNote}
              </p>
            </div>
          ))}
        </div>
      </main>
    </Sidebar>
  );
}