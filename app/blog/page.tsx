import { getBlogPosts } from '@/lib/data';
import Footer from '@/components/Footer';

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <a href="/" className="text-sm font-semibold text-[#1E88E5]">← Back home</a>
        <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-10">The Journal</h1>

        {posts.length === 0 && <p className="text-slate-400 text-sm">No posts published yet.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post: any) => (
            <a key={post.id} href={`/blog/${post.slug}`} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover_image || post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{post.category || 'Travel'} {post.read_time ? `· ${post.read_time}` : ''}</p>
                <h2 className="mt-2 font-bold text-lg text-slate-900 leading-snug">{post.title}</h2>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                {post.author && <p className="mt-3 text-xs text-slate-400">By {post.author}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}