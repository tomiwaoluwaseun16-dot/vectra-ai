import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex items-center justify-center p-6 selection:bg-cyan-500 selection:text-slate-950">
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
              V
            </div>
            <span className="font-bold text-xl tracking-wide text-white">Vectra AI</span>
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-sm text-slate-400 mt-1">Access your Vectra AI trading command center</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="trader@vectra.ai"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <a href="#" className="text-xs text-cyan-400 hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <Link
            href="/dashboard"
            className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base shadow-lg shadow-cyan-500/20 transition-all mt-2"
          >
            Sign In to Terminal
          </Link>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-cyan-400 font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}