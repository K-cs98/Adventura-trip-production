'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient'; // 1. Corrected import
import type { Enquiry } from '@/types';

export default function EnquiriesViewer() {
  const supabase = createClient(); // 2. Initialized supabase instance
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    setEnquiries(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function sendReply(id: string) {
    const reply = replyDrafts[id];
    if (!reply?.trim()) return;
    
    await supabase.from('enquiries').update({ status: 'replied', reply_message: reply }).eq('id', id);
    load();
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h2 className="font-bold text-lg text-slate-900 mb-1">Inbox</h2>
      <p className="text-xs text-slate-400 mb-4">
        Messages from the site's chat widget. Replies save here — wire up an email provider to send them automatically (see README).
      </p>
      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : enquiries.length === 0 ? (
        <p className="text-sm text-slate-400">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <div key={e.id} className="border border-slate-100 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">{e.sender_name} · {e.sender_email}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.status === 'unread' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                  {e.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1">{e.message}</p>
              {e.reply_message ? (
                <p className="text-xs text-slate-400 mt-2 italic">Replied: {e.reply_message}</p>
              ) : (
                <div className="mt-2 flex gap-2">
                  <input
                    value={replyDrafts[e.id] ?? ''}
                    onChange={(ev) => setReplyDrafts({ ...replyDrafts, [e.id]: ev.target.value })}
                    placeholder="Type a reply…"
                    className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                  />
                  <button onClick={() => sendReply(e.id)} className="text-xs font-semibold bg-slate-900 text-white px-3 py-1.5 rounded-lg">
                    Save reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}