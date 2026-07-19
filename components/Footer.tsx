'use client';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-bold text-white text-lg">Adventura Trips</p>
          <p className="mt-3 text-slate-400 max-w-xs">Bespoke luxury travel planning, curated tours, and private trip design.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Explore</p>
          <ul className="space-y-2">
            <li><a href="/#tours" className="hover:text-white transition-colors">Expeditions</a></li>
            <li><a href="/#curator" className="hover:text-white transition-colors">Bespoke Curator</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Journal</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Company</p>
          <ul className="space-y-2">
            <li><a href="/#reviews" className="hover:text-white transition-colors">Reviews</a></li>
            <li><a href="/admin/login" className="hover:text-white transition-colors">Admin</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Contact</p>
          <p>Use the chat widget in the bottom-right corner and our team will respond by email.</p>
        </div>
      </div>
      <p className="text-center text-xs text-slate-600 mt-12">© {new Date().getFullYear()} Adventura Trips. All rights reserved.</p>
    </footer>
  );
}
