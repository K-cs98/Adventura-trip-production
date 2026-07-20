'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';

export interface FieldConfig {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'textarea' | 'checkbox' | 'tags';
  placeholder?: string;
}

export default function CrudManager({
  table,
  title,
  fields,
  defaultValues
}: {
  table: string;
  title: string;
  fields: FieldConfig[];
  defaultValues: Record<string, any>;
}) {
  const supabase = createClient();
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, any>>(defaultValues);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadRows() {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });
    if (fetchError) setError(fetchError.message);
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = { ...form };
    for (const f of fields) {
      if (f.type === 'tags' && typeof payload[f.key] === 'string') {
        payload[f.key] = payload[f.key].split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (f.type === 'number') {
        payload[f.key] = Number(payload[f.key]) || 0;
      }
    }

    const { error: insertError } = await supabase.from(table).insert(payload);
    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }
    setForm(defaultValues);
    loadRows();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this entry?')) return;
    await supabase.from(table).delete().eq('id', id);
    loadRows();
  }

  async function togglePublished(row: any) {
    if (!('is_published' in row)) return;
    await supabase.from(table).update({ is_published: !row.is_published }).eq('id', row.id);
    loadRows();
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h2 className="font-bold text-lg text-slate-900 mb-4">{title}</h2>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 border-b border-slate-100 pb-6">
        {fields.map((f) => (
          <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
            <label className="text-xs font-semibold text-slate-600">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                value={form[f.key] ?? ''}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                rows={3}
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
            ) : f.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={!!form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                className="mt-2 block"
              />
            ) : (
              <input
                type={f.type === 'number' ? 'number' : 'text'}
                value={form[f.key] ?? ''}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
            )}
          </div>
        ))}
        {error && <p className="sm:col-span-2 text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="sm:col-span-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : `Add ${title.slice(0, -1)}`}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate-400">No entries yet.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center justify-between border border-slate-100 rounded-lg px-4 py-2.5">
              <p className="text-sm font-medium text-slate-800 truncate max-w-md">
                {row.title || row.property || row.route || row.name || row.id}
              </p>
              <div className="flex items-center gap-3">
                {'is_published' in row && (
                  <button
                    onClick={() => togglePublished(row)}
                    className={`text-[11px] font-bold px-2 py-1 rounded-full ${row.is_published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}
                  >
                    {row.is_published ? 'Published' : 'Hidden'}
                  </button>
                )}
                <button onClick={() => handleDelete(row.id)} className="text-xs font-semibold text-red-500 hover:text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}