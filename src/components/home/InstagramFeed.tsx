'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { mockInstagramPosts } from '@/lib/mock-data';

export function InstagramFeed() {
  return (
    <section className="section-padding bg-bg-secondary dark:bg-bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="text-primary-600 font-medium text-sm uppercase tracking-wider mb-2">@clbakers.bakery</p>
          <h2 className="font-display text-4xl font-bold text-text-primary">Follow Our Story</h2>
          <p className="text-text-muted mt-2 text-sm">Behind-the-scenes moments and daily bakes</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {mockInstagramPosts.map((post) => (
            <InstagramPost key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-primary-600 text-primary-600 rounded-full text-sm font-medium hover:bg-primary-600 hover:text-white transition-all">
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramPost({ post }: { post: typeof mockInstagramPosts[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={post.image} alt={post.caption} fill className="object-cover transition-transform duration-400 group-hover:scale-110" sizes="(max-width: 640px) 50vw, 25vw" />
      {hovered && (
        <div className="absolute inset-0 bg-primary-900/60 flex flex-col items-center justify-center gap-2 animate-fade-in">
          <Heart size={24} className="text-white fill-white" />
          <p className="text-white font-semibold text-sm">{post.likes.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
