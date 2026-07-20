'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert(error.message);
    } else {
      router.push('/admin'); // Redirect to dashboard on success
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 max-w-sm mx-auto">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2" />
      <button type="submit" className="bg-blue-600 text-white p-2">Login</button>
    </form>
  );
}