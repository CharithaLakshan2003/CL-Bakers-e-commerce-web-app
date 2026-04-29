'use client';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/mock-data';

export function CategoryTiles() {
  return (
    <section className="section-padding bg-bg-secondary dark:bg-bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="text-primary-600 font-medium text-sm uppercase tracking-wider mb-2">Browse by Category</p>
          <h2 className="font-display text-4xl font-bold text-text-primary">
            What Are You Craving?
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group flex flex-col items-center gap-3 cursor-pointer"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary-600 transition-all duration-300 shadow-card group-hover:shadow-warm">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover product-img group-hover:scale-110 transition-transform duration-400"
                  sizes="128px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent group-hover:from-primary-900/70 transition-all" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                  {cat.label}
                </p>
                <p className="text-xs text-text-muted">{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
