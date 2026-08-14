'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function CoachPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Trader! I am your AI Risk & Strategy Coach. Ask me anything about your trade execution logs, risk limits, or market conditions.",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Analyzing: "${userMsg}". Based on your recent telemetry, Risk Guard is performing well by maintaining strict order caps while keeping slippage minimal.`,
        },
      ]);
    }, 1000);
  };

  return (
    <Sidebar>
      <main className="p-6 space-y-6 max-w-4xl mx-auto w-full flex flex-col h-[calc(100vh-3rem)]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>🤖</span> AI Strategy Coach
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Personalized AI advisory grounded in your account telemetry and execution history.
          </p>
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 overflow-y-auto space-y-3 font-mono text-xs">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl max-w-lg ${
                m.sender === 'user'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 ml-auto'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              <div className="text-[10px] text-slate-500 mb-1">{m.sender === 'user' ? 'YOU' : 'AI COACH'}</div>
              {m.text}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Coach e.g. 'How can I optimize my Risk Guard settings?'"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
          >
            Send
          </button>
        </div>
      </main>
    </Sidebar>
  );
}