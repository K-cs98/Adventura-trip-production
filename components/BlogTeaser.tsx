'use client';
import type { BlogPost } from '@/types';

export default function BlogTeaser({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#26A69A] font-bold tracking-[0.2em] text-xs uppercase mb-3">Journal</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Travel guides &amp; stories</h2>
          </div>
          <a href="/blog" className="text-sm font-semibold text-[#1E88E5] hover:underline hidden md:block">View all</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <a key={post.id} href={`/blog/${post.slug}`} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{post.category} · {post.read_time}</p>
                <h3 className="mt-2 font-bold text-slate-900 leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
