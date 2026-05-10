import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { SessionSync } from '@/components/SessionSync';

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'CL Bakers — Freshly Baked Daily', template: '%s | CL Bakers' },
  description: 'Artisan breads, pastries, cakes and more baked fresh every morning. Shop online for pickup or delivery.',
  keywords: ['bakery', 'artisan bread', 'pastries', 'cakes', 'fresh baked', 'CL Bakers'],
  authors: [{ name: 'CL Bakers' }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clbakers.com',
    siteName: 'CL Bakers',
    title: 'CL Bakers — Freshly Baked Daily',
    description: 'Freshly baked artisan goods delivered to your door.',
    images: [{ url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200', width: 1200, height: 630, alt: 'CL Bakers' }],
  },
  twitter: { card: 'summary_large_image', title: 'CL Bakers', description: 'Freshly baked artisan goods delivered to your door.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} min-h-screen flex flex-col`}>
        <SessionSync />
        {children}
      </body>
    </html>
  );
}
