'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';

// Custom Brand Icons as Lucide doesn't include them anymore
const Instagram = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Youtube = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 61.76 61.76 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 61.76 61.76 0 0 1-15 0 2 2 0 0 1-2-2z" /><path d="m10 15 5-3-5-3z" />
  </svg>
);

const quickLinks = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop?category=bread', label: 'Artisan Bread' },
  { href: '/shop?category=pastry', label: 'Pastries' },
  { href: '/shop?category=cake', label: 'Cakes' },
  { href: '/custom-cake', label: 'Custom Cakes' },
  { href: '/contact', label: 'Contact Us' },
];

const hours = [
  { day: 'Mon – Fri', time: '6:00 AM – 7:00 PM' },
  { day: 'Saturday', time: '6:00 AM – 8:00 PM' },
  { day: 'Sunday', time: '7:00 AM – 5:00 PM' },
];

export function Footer() {
  return (
    <footer className="bg-primary-900 text-cream-200">
      {/* Main grid */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 – Bakery Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-5">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo1.png"
                  alt="CL Bakers Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl font-bold text-cream-100">CL <span className="text-honey">Bakers</span></span>
            </div>
            <p className="text-sm text-cream-200/70 leading-relaxed">
              Artisan baked goods made fresh every morning with locally sourced ingredients and old-world techniques.
            </p>
            <div className="space-y-2 text-sm text-cream-200/70">
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-honey" />42 Main Street, Downtown, City 10001</p>
              <p className="flex items-center gap-2"><Phone size={14} className="shrink-0 text-honey" />+1 (555) 234-5678</p>
              <p className="flex items-center gap-2"><Mail size={14} className="shrink-0 text-honey" />hello@clbakers.com</p>
            </div>
          </div>

          {/* Col 2 – Quick Links */}
          <div>
            <h3 className="text-cream-100 font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream-200/70 hover:text-honey transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Hours */}
          <div>
            <h3 className="text-cream-100 font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              <Clock size={14} className="text-honey" /> Opening Hours
            </h3>
            <div className="space-y-2">
              {hours.map(h => (
                <div key={h.day} className="text-sm">
                  <p className="text-cream-100/90 font-medium">{h.day}</p>
                  <p className="text-cream-200/60">{h.time}</p>
                </div>
              ))}
            </div>
            {/* Social */}
            <div className="mt-6">
              <h3 className="text-cream-100 font-semibold mb-3 text-sm uppercase tracking-wider">Follow Us</h3>
              <div className="flex gap-2">
                {[
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Youtube, href: '#', label: 'YouTube' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-9 h-9 rounded-full bg-primary-800 flex items-center justify-center text-cream-200/60 hover:bg-honey hover:text-primary-900 transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4 – Newsletter */}
          <div>
            <h3 className="text-cream-100 font-semibold mb-2 text-sm uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-cream-200/70 mb-4">Get weekly specials, recipes, and early access to new products.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing! 🥐'); }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-primary-800 border border-primary-700 text-cream-100 placeholder:text-cream-200/40 text-sm focus:outline-none focus:border-honey transition-colors"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-honey text-primary-900 rounded-full text-sm font-semibold hover:bg-honey-dark transition-colors cursor-pointer"
              >
                <Send size={14} /> Subscribe
              </button>
            </form>
            <p className="text-xs text-cream-200/40 mt-2">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-800">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-200/40">
          <p>© {new Date().getFullYear()} CL Bakers. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-honey transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-honey transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
