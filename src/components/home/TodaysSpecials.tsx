'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { mockSpecials } from '@/lib/mock-data';
import { useCartStore } from '@/stores/cart.store';
import { useUIStore } from '@/stores/ui.store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function TodaysSpecials() {
  const [current, setCurrent] = useState(0);
  const { addItem } = useCartStore();
  const { triggerCartAnimation } = useUIStore();

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % mockSpecials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  if (!mockSpecials.length) return null;
  const special = mockSpecials[current];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-8">
          <p className="text-primary-600 font-medium text-sm uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
            <Tag size={14} /> Today Only
          </p>
          <h2 className="font-display text-4xl font-bold text-text-primary">Today&apos;s Specials</h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-primary-600 min-h-80 flex items-center">
          {/* BG image */}
          <Image
            src={special.images[0]}
            alt={special.name}
            fill
            className="object-cover opacity-30 transition-opacity duration-500"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-transparent" />

          <div className="relative z-10 flex items-center w-full px-8 sm:px-12 py-10 gap-8">
            <div className="flex-1 text-white">
              <span className="inline-block px-3 py-1 bg-honey text-primary-900 text-xs font-bold rounded-full mb-4">
                TODAY&apos;S SPECIAL
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold mb-3 !text-yellow-600 dark:!text-white">{special.name}</h3>
              <p className="text-white/70 text-sm max-w-md mb-6 line-clamp-2">{special.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-display text-3xl font-bold text-honey">{formatPrice(special.price)}</span>
                <Button
                  onClick={() => { addItem(special); triggerCartAnimation(); }}
                  variant="honey"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Link href={`/product/${special.id}`}>
                  <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="hidden sm:block relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shrink-0 shadow-warm-lg">
              <Image src={special.images[0]} alt={special.name} fill className="object-cover" sizes="256px" />
            </div>
          </div>

          {/* Controls */}
          {mockSpecials.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
              <button onClick={() => setCurrent(c => (c - 1 + mockSpecials.length) % mockSpecials.length)}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              {mockSpecials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'bg-honey w-4' : 'bg-white/40'}`} />
              ))}
              <button onClick={() => setCurrent(c => (c + 1) % mockSpecials.length)}
                className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
