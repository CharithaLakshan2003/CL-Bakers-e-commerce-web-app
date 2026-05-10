'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { X, User } from 'lucide-react';
import { useUIStore } from '@/stores/ui.store';
import { useUserStore } from '@/stores/user.store';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  navLinks: { href: string; label: string }[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { isLoggedIn, user } = useUserStore();

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-card-bg border-r border-border shadow-warm-lg animate-slide-in-left">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="font-display font-bold text-xl text-yellow-600 dark:text-white">
            CL <span className="text-primary-600">Bakers</span>
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted text-yellow-600 hover:text-text-primary hover:bg-primary-50 dark:text-white dark:hover:bg-primary-900/30 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-4 py-3 rounded-xl text-yellow-600 hover:text-primary-600 hover:bg-primary-50 dark:text-white dark:hover:bg-primary-600/30 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-secondary">
              <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold">
                {user?.name?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-yellow-600 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-text-muted text-yellow-600 dark:text-white truncate">{user?.email}</p>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
            >
              <User size={16} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
