'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/user.store';
import { LayoutDashboard, ShoppingBag, User, Heart, MapPin, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useUserStore();

  const navLinks = [
    { href: '/account', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
    { href: '/account/profile', label: 'Profile Details', icon: User },
    { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  ];

  return (
    <div className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Profile summary */}
      <div className="bg-card-bg border border-border rounded-2xl p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 mx-auto flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-3xl mb-3">
          {user?.name?.[0]?.toUpperCase() ?? 'U'}
        </div>
        <h2 className="font-bold text-text-primary">{user?.name}</h2>
        <p className="text-sm text-text-muted">{user?.email}</p>
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-honey/20 text-honey-dark dark:text-honey rounded-full text-xs font-bold">
          ⭐ {user?.loyaltyPoints} Points
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-card-bg border border-border rounded-2xl p-3 flex flex-col gap-1">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                active 
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' 
                  : 'text-text-secondary hover:bg-bg hover:text-primary-600'
              )}
            >
              <link.icon size={18} className={active ? 'text-primary-600' : 'text-text-muted'} />
              {link.label}
            </Link>
          );
        })}
        <div className="h-px bg-border my-2 mx-4" />
        <button
          onClick={() => {
            logout();
            window.location.href = '/auth/login';
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
        >
          <LogOut size={18} className="text-red-500" />
          Sign Out
        </button>
      </nav>
    </div>
  );
}
