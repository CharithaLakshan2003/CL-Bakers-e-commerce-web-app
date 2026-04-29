'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-100 dark:bg-primary-900/30 group cursor-pointer" onClick={() => setLightbox(true)}>
          <Image src={images[current]} alt={`${name} - image ${current + 1}`} fill className="object-cover product-img" sizes="(max-width: 768px) 100vw, 50vw" priority />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
              <ZoomIn size={18} className="text-primary-700" />
            </div>
          </div>
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setCurrent(c => (c - 1 + images.length) % images.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setCurrent(c => (c + 1) % images.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'relative w-18 h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer',
                  i === current ? 'border-primary-600' : 'border-border hover:border-primary-300'
                )}
                style={{ width: 72, height: 72 }}
              >
                <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill className="object-cover" sizes="72px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white cursor-pointer" onClick={() => setLightbox(false)}>✕</button>
          <div className="relative max-w-2xl w-full aspect-square" onClick={e => e.stopPropagation()}>
            <Image src={images[current]} alt={name} fill className="object-contain" sizes="800px" />
          </div>
        </div>
      )}
    </>
  );
}
