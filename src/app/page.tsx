'use client';

import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar with Auth */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-zinc-800">
        <div className="text-xl font-bold tracking-wider">Vectra AI</div>
        
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition">
                Customer Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition">
                Get Started
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link href="/dashboard" className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition">
              Go to Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Powered By <span className="text-blue-500">Unbreakable Risk Guardrails</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Vectra AI separates market analysis from risk enforcement. Specialised AI sub-agents scan market indicators, validate strict capital caps, and safeguard execution.
        </p>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-8 text-zinc-600 text-sm border-t border-zinc-900 mt-20">
        © 2026 Vectra AI System. Trading carries risk. Always practice responsible capital preservation.
      </footer>
    </main>
  );
}