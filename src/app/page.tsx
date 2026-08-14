'use client';

import Link from 'next/link';
import { SignInButton, SignUpButton, SignOutButton, useAuth } from '@clerk/nextjs';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-xl font-mono shadow-lg shadow-cyan-500/20">
            V
          </div>
          <span className="font-bold text-lg tracking-tight text-white font-mono">Vectra AI</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Features</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Multi-Agent System</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Vectra Academy</span>
        </nav>

        {/* Auth / Sign Out Actions */}
        <div className="flex items-center gap-4">
          {isLoaded && !isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 font-mono">
                  Get Started
                </button>
              </SignUpButton>
            </>
          )}

          {isLoaded && isSignedIn && (
            <div className="flex items-center gap-3">
              <Link
                href="/ai-trading"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 font-mono"
              >
                Enter Terminal ⚡
              </Link>
              <SignOutButton redirectUrl="/">
                <button className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs font-mono transition-all border border-rose-500/20 flex items-center gap-2">
                  <span>🚪</span> Sign Out
                </button>
              </SignOutButton>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center space-y-8 flex-1 flex flex-col justify-center items-center">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Precision Trading Signals <br />
            Powered By <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Unbreakable Risk Guardrails
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            Vectra AI separates market analysis from risk enforcement. Specialised AI sub-agents scan market indicators, validate strict capital caps, and safeguard execution.
          </p>
        </div>

        {/* Call-To-Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {isLoaded && !isSignedIn && (
            <SignUpButton mode="modal">
              <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono transition-all shadow-xl shadow-cyan-500/20 text-base">
                Launch AI Trading Terminal 🚀
              </button>
            </SignUpButton>
          )}
          {isLoaded && isSignedIn && (
            <Link
              href="/ai-trading"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono transition-all shadow-xl shadow-cyan-500/20 text-base"
            >
              Enter AI Trading Terminal ⚡
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-6 py-8 border-t border-slate-900 text-center text-xs text-slate-500 relative">
        © 2026 Vectra AI System. Trading carries risk. Always practice responsible capital preservation.

        {/* HIDDEN BACKDOOR: Blinking Red Light in the Bottom Right Corner */}
        <Link 
          href="/admin-login" 
          aria-label="Admin Portal"
          className="absolute right-6 bottom-6 flex items-center justify-center w-4 h-4 group"
        >
          <span className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></span>
          <span className="relative w-2 h-2 bg-red-600 rounded-full shadow-lg shadow-red-500"></span>
        </Link>
      </footer>
    </div>
  );
}