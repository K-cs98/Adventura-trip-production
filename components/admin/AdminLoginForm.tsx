'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(
    searchParams.get('error') === 'not_authorized' ? 'That account is not an admin.' : null
  );
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <form onSubmit={handleLogin} className="max-w-sm w-full bg-white border border-slate-100 rounded-2xl p-8">
        <h1 className="font-bold text-xl text-slate-900">Admin Sign In</h1>
        <p className="text-sm text-slate-500 mt-1">Adventura Trips dashboard</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
              required
            />
          </div>
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </div>

        <p className="mt-6 text-[11px] text-slate-400">
          Accounts are created in the Supabase Auth dashboard, then added to the{' '}
          <code className="bg-slate-100 px-1 rounded">admin_users</code> table. See README.md.
        </p>
      </form>
    </div>
  );
}
