import { getTours, getHotels, getFlights, getBlogPosts, getMediaGallery, getReviews } from '@/lib/data';
import HomeClient from '@/components/HomeClient';

export const revalidate = 60; // re-fetch catalog data at most once a minute

export default async function HomePage() {
  const [tours, hotels, flights, blogPosts, mediaGallery, reviews] = await Promise.all([
    getTours(),
    getHotels(),
    getFlights(),
    getBlogPosts(),
    getMediaGallery(),
    getReviews()
  ]);

  return (
    <HomeClient
      tours={tours}
      hotels={hotels}
      flights={flights}
      blogPosts={blogPosts}
      mediaGallery={mediaGallery}
      reviews={reviews}
    />
  );
}
