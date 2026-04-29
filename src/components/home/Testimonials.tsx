'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { mockTestimonials } from '@/lib/mock-data';
import { StarRating } from '@/components/ui/StarRating';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => (c === 0 ? mockTestimonials.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === mockTestimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="section-padding bg-primary-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,193,7,0.06),transparent_70%)]" />

      <div className="container-custom relative">
        <div className="text-center mb-12">
          <p className="text-honey font-medium text-sm uppercase tracking-wider mb-2">What Our Customers Say</p>
          <h2 className="font-display text-4xl font-bold">Loved by Thousands</h2>
        </div>

        {/* Desktop: show all 3 */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {mockTestimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} highlight={i === 1} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="lg:hidden">
          <TestimonialCard testimonial={mockTestimonials[current]} highlight />
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {mockTestimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={cn('w-2 h-2 rounded-full transition-all cursor-pointer', i === current ? 'bg-honey w-4' : 'bg-white/30')} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t, highlight }: { testimonial: typeof mockTestimonials[0]; highlight?: boolean }) {
  return (
    <div className={cn(
      'rounded-2xl p-6 sm:p-8 border transition-all',
      highlight
        ? 'bg-primary-700/60 border-honey/30 shadow-warm-lg scale-[1.02]'
        : 'bg-primary-800/40 border-white/10'
    )}>
      <Quote size={28} className="text-honey mb-4 opacity-80" />
      <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-6 italic">
        "{t.comment}"
      </p>
      <div className="flex items-center gap-3">
        <Image src={t.avatar} alt={t.name} width={44} height={44} className="rounded-full object-cover ring-2 ring-honey/40" />
        <div>
          <p className="font-semibold text-white text-sm">{t.name}</p>
          <p className="text-white/50 text-xs">{t.role} · {t.product}</p>
        </div>
        <StarRating rating={t.rating} size="sm" className="ml-auto" />
      </div>
    </div>
  );
}
