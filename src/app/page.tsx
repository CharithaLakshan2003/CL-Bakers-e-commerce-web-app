import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { TodaysSpecials } from '@/components/home/TodaysSpecials';
import { Testimonials } from '@/components/home/Testimonials';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';

export const metadata: Metadata = {
  title: 'CL Bakers — Freshly Baked Daily',
  description: 'Artisan breads, pastries, cakes and more baked fresh every morning. Shop online for pickup or delivery.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoryTiles />
        <FeaturedProducts />
        <TodaysSpecials />
        <Testimonials />
        <InstagramFeed />
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
}
