'use client';
import type { CustomerReview } from '@/types';

export default function ReviewsSection({ reviews }: { reviews: CustomerReview[] }) {
  if (reviews.length === 0) return null;
  return (
    <section id="reviews" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-[#26A69A] font-bold tracking-[0.2em] text-xs uppercase mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What our travelers say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white border border-slate-100 rounded-2xl p-6">
            <div className="text-[#1E88E5] mb-3">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
            <p className="text-sm text-slate-600 leading-relaxed">{r.comment}</p>
            <p className="mt-4 font-semibold text-sm text-slate-900">{r.name}</p>
            {r.role && <p className="text-xs text-slate-400">{r.role}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
