'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function SupportChatWidget({ onSubmitted }: { onSubmitted: (msg: string) => void }) {
  const supabase = createClient(); // Initialized supabase client instance
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !message.trim()) {
      setError('Please add your email and a message.');
      return;
    }

    setSending(true);
    const { error: dbError } = await supabase.from('enquiries').insert({
      sender_name: name || 'Website visitor',
      sender_email: email,
      subject: 'Chat widget enquiry',
      message
    });
    setSending(false);

    if (dbError) {
      setError('Could not send — please try again.');
      return;
    }

    setSent(true);
    onSubmitted("Message sent — we'll reply to your email soon.");
    setMessage('');
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-sm text-slate-900">Chat with our team</p>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700" aria-label="Close chat">×</button>
          </div>

          {sent ? (
            <p className="text-sm text-slate-500">
              Thanks — we typically reply within a few hours by email.
            </p>
          ) : (
            <form onSubmit={handleSend} className="space-y-2.5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#1E88E5] hover:bg-[#1976D2] disabled:opacity-60 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-slate-900 text-white text-xl shadow-xl hover:bg-slate-800 transition-colors"
        aria-label="Open chat"
      >
        {open ? '×' : '💬'}
      </button>
    </div>
  );
}