'use client';
import type { MediaAsset } from '@/types';

export default function MediaGallerySection({ items }: { items: MediaAsset[] }) {
  if (items.length === 0) return null;
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[#26A69A] font-bold tracking-[0.2em] text-xs uppercase mb-3">From The Field</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Moments from past trips</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative rounded-xl overflow-hidden aspect-square group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnail || item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-xs font-semibold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
