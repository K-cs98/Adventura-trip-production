import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/data';
import Footer from '@/components/Footer';

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <a href="/blog" className="text-sm font-semibold text-[#1E88E5]">← All posts</a>
        <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{post.category} · {post.read_time}</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-400">By {post.author}</p>

        <div className="mt-8 h-72 rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="mt-8 prose prose-slate max-w-none whitespace-pre-line text-slate-700 leading-relaxed">
          {post.content}
        </div>
      </article>
      <Footer />
    </>
  );
}
