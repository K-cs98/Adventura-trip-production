'use client';

export default function Hero() {
  return (
    <section className="relative bg-slate-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80')" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 text-center">
        <p className="text-[#26A69A] font-bold tracking-[0.2em] text-xs uppercase mb-4">Bespoke Global Expeditions</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
          Travel exactly the way you imagined it
        </h1>
        <p className="mt-6 text-slate-300 max-w-xl mx-auto">
          Hand-curated luxury tours, private transport, and stays — booked in minutes, tailored to you.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#tours"
            className="bg-[#1E88E5] hover:bg-[#1976D2] transition-colors px-8 py-3 rounded-xl font-semibold"
          >
            Browse Expeditions
          </a>
          <a
            href="#curator"
            className="border border-white/30 hover:bg-white/10 transition-colors px-8 py-3 rounded-xl font-semibold"
          >
            Build a Custom Trip
          </a>
        </div>
      </div>
    </section>
  );
}
