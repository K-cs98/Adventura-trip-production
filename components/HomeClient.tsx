'use client';
import { useEffect, useState } from 'react';
import type { Tour, Hotel, FlightRecord, BlogPost, MediaAsset, CustomerReview, CurrencyCode } from '@/types';
import { STATIC_RATES } from '@/lib/currency';
import Header from './Header';
import Hero from './Hero';
import TourGrid from './TourGrid';
import CuratorTool from './CuratorTool';
import FlightsAndHotels from './FlightsAndHotels';
import MediaGallerySection from './MediaGallerySection';
import ReviewsSection from './ReviewsSection';
import BlogTeaser from './BlogTeaser';
import Footer from './Footer';
import SupportChatWidget from './SupportChatWidget';
import CheckoutModal from './CheckoutModal';
import Toast from './Toast';

export default function HomeClient({
  tours,
  hotels,
  flights,
  blogPosts,
  mediaGallery,
  reviews
}: {
  tours: Tour[];
  hotels: Hotel[];
  flights: FlightRecord[];
  blogPosts: BlogPost[];
  mediaGallery: MediaAsset[];
  reviews: CustomerReview[];
}) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(STATIC_RATES);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/currency')
      .then((r) => r.json())
      .then((d) => d?.rates && setRates(d.rates))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  function toggleWishlist(id: string) {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setToast('Removed from wishlist');
      } else {
        next.add(id);
        setToast('Added to wishlist');
      }
      return next;
    });
  }

  return (
    <>
      <Toast message={toast} />
      <Header currency={currency} setCurrency={setCurrency} wishlistCount={wishlist.size} onCartClick={() => setToast(`${wishlist.size} saved trip(s)`)} />
      <Hero />
      <TourGrid
        tours={tours}
        currency={currency}
        rates={rates}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onBook={(tour) => setBookingTour(tour)}
      />
      <CuratorTool currency={currency} onSubmitted={setToast} />
      <FlightsAndHotels flights={flights} hotels={hotels} currency={currency} rates={rates} />
      <MediaGallerySection items={mediaGallery} />
      <ReviewsSection reviews={reviews} />
      <BlogTeaser posts={blogPosts} />
      <Footer />
      <SupportChatWidget onSubmitted={setToast} />

      {bookingTour && <CheckoutModal tour={bookingTour} onClose={() => setBookingTour(null)} />}
    </>
  );
}
