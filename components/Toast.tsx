'use client';

export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-2xl animate-fadeIn">
      {message}
    </div>
  );
}
