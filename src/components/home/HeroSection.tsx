'use client';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=85')" }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/75 via-primary-900/50 to-primary-900/80" />
      {/* Warm texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,193,7,0.08),transparent_60%)]" />

      <div className="relative container-custom text-center text-white pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey/20 border border-honey/30 text-honey text-sm font-medium mb-6 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-honey animate-pulse" />
          Baked Fresh Every Morning at 6 AM
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 animate-fade-in-up [animation-delay:100ms]">
          <span className="text-yellow-500 dark:text-white">Freshly Baked</span><br />
          <span className="text-yellow-200 italic">Daily</span>
          <span className="text-yellow-500 dark:text-white"> with Love</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/75 max-w-xl mx-auto mb-10 animate-fade-in-up [animation-delay:200ms]">
          Artisan breads, flaky pastries, and celebration cakes crafted with the finest local ingredients and generations of passion.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:300ms]">
          <Link href="/shop">
            <Button size="xl" variant="honey" icon={<ArrowRight size={20} />} iconPosition="right">
              Shop Now
            </Button>
          </Link>
          <Link href="/custom-cake">
            <Button size="xl" variant="outline" className="border-white/60 text-white hover:bg-white/10 hover:border-white">
              Order Custom Cake
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-16 mt-16 animate-fade-in-up [animation-delay:400ms]">
          {[
            { value: '50+', label: 'Products Daily' },
            { value: '2,000+', label: 'Happy Customers' },
            { value: '4.9★', label: 'Average Rating' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-honey">{stat.value}</p>
              <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#featured" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-float">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
