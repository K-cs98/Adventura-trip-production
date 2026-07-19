'use client';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return null;

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <p className="font-bold text-slate-900">Adventura Trips <span className="text-slate-400 font-normal">/ Admin</span></p>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800">View site</a>
          <button onClick={handleSignOut} className="text-sm font-semibold text-red-500 hover:text-red-600">Sign out</button>
        </div>
      </div>
    </header>
  );
}
