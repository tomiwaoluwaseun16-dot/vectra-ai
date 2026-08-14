'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'GENERALALESH' && password === 'GENERAL2026') {
      // Set an admin cookie or session flag and redirect to admin dashboard
      localStorage.setItem('vectra_admin_auth', 'true');
      router.push('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto flex items-center justify-center text-red-500 font-bold font-mono text-xl shadow-lg shadow-red-500/10">
            🔒
          </div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">System Command</h1>
          <p className="text-xs text-slate-400">Authorized Personnel Only. AI Reporting Terminal.</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Admin Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono transition-colors"
              placeholder="Enter username..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Passcode</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center">
              ⚠️ Access Denied: Invalid Security Credentials
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-xs transition-all shadow-lg shadow-red-600/20 uppercase tracking-wider"
          >
            Authenticate Access
          </button>
        </form>

        <div className="text-center">
          <a href="/" className="text-[10px] text-slate-500 hover:text-slate-400 font-mono transition-colors">
            ← Return to Public Terminal
          </a>
        </div>
      </div>
    </div>
  );
}