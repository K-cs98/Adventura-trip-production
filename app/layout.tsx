import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adventura Trips | Bespoke Luxury Travel',
  description: 'Curated luxury expeditions, private charters, and bespoke trip planning across the globe.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  );
}
