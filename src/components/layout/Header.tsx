'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, User, Search, Menu, Sun, Moon, ChevronDown, LogOut, Package, Settings } from 'lucide-react';
import { useCartStore } from '@/stores/cart.store';
import { useUIStore } from '@/stores/ui.store';
import { useUserStore } from '@/stores/user.store';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { signOut } from 'next-auth/react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/custom-cake', label: 'Custom Cake' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isDark, toggleDark, setMobileMenuOpen, setSearchOpen } = useUIStore();
  const { user, isLoggedIn, logout } = useUserStore();
  const itemCount = useCartStore(s => s.itemCount());
  const cartAnimating = useUIStore(s => s.cartAnimating);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Init dark class on mount
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled ? 'glass shadow-warm py-3' : 'bg-transparent py-4'
      )}>
        <div className="container-custom">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                <Image
                  src="/logo1.png"
                  alt="CL Bakers Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-display font-bold text-xl text-text-primary tracking-tight">
                CL <span className="text-primary-600">Bakers</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'bg-primary-600 text-white'
                      : 'text-text-secondary text-yellow-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted text-yellow-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Dark mode */}
              <button
                onClick={toggleDark}
                className="w-9 h-9 rounded-full flex items-center justify-center text-text-muted text-yellow-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors cursor-pointer"
                aria-label={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-text-muted text-yellow-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className={cn(
                  'relative w-9 h-9 rounded-full flex items-center justify-center',
                  'text-text-muted text-yellow-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors',
                  cartAnimating && 'animate-wiggle'
                )}
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingCart size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 text-yellow-600 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold leading-none">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* User */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full border border-border hover:border-primary-400 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    <ChevronDown size={14} className={cn('text-text-muted transition-transform', userMenuOpen && 'rotate-180')} />
                  </button>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-52 bg-card-bg border border-border rounded-xl shadow-warm-lg z-20 py-1 animate-fade-in-up">
                        <div className="px-3 py-2 border-b border-border">
                          <p className="text-sm font-semibold text-text-primary truncate">{user?.name}</p>
                          <p className="text-xs text-text-muted truncate">{user?.email}</p>
                        </div>
                        {[
                          { href: '/account', icon: User, label: 'My Account' },
                          { href: '/account/orders', icon: Package, label: 'Orders' },
                          ...(user?.role === 'ADMIN' ? [{ href: '/admin', icon: Settings, label: 'Admin Panel' }] : []),
                          ...(user?.role === 'BAKER' ? [{ href: '/baker', icon: Settings, label: 'Baker Dashboard' }] : []),
                        ].map(item => (
                          <Link key={item.href} href={item.href} onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-text-secondary hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-colors">
                            <item.icon size={15} />
                            {item.label}
                          </Link>
                        ))}
                        <button
                          onClick={async () => { 
                            await signOut({ redirect: false });
                            logout(); 
                            setUserMenuOpen(false); 
                            window.location.href = '/';
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/auth/login"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-700 transition-colors shadow-warm">
                  <User size={14} />
                  Sign In
                </Link>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-text-muted text-yellow-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu navLinks={navLinks} />
      <SearchOverlay />
    </>
  );
}
