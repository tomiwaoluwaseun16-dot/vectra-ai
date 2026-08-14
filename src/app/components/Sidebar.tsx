'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'AI Trading', href: '/ai-trading', icon: '⚡' },
    { name: 'Portfolio', href: '/portfolio', icon: '💰' },
    { name: 'Markets', href: '/markets', icon: '📈' },
    { name: 'AI Signals', href: '/ai-signals', icon: '🎯' },
    { name: 'History', href: '/history', icon: '📜' },
    { name: 'Analytics', href: '/analytics', icon: '📊' },
    { name: 'Trade Journal', href: '/trade-journal', icon: '📓' },
    { name: 'Watchlist', href: '/watchlist', icon: '⭐' },
    { name: 'AI Academy', href: '/ai-academy', icon: '🎓' },
    { name: 'AI Coach', href: '/ai-coach', icon: '🤖' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-950 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="p-5 space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-cyan-500/20">
              V
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Vectra AI</span>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700/60 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Account Bar */}
        <div className="p-4 border-t border-slate-800/80 m-3 rounded-2xl bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400">
              N
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Trader Account</div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                System Online
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Page Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}