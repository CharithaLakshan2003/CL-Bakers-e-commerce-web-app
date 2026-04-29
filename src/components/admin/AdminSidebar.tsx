'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/user.store';
import { LayoutDashboard, ShoppingBag, Package, Users, Tag, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useUserStore();

  const links = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/coupons', label: 'Coupons', icon: Tag },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-card-bg border-r border-border h-screen sticky top-0 flex flex-col shrink-0">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="font-display font-bold text-xl text-text-primary tracking-tight">
            CL <span className="text-primary-600">Bakers</span> <span className="text-xs font-sans text-text-muted uppercase ml-1">Admin</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map(link => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active
                  ? 'bg-primary-600 text-white shadow-warm'
                  : 'text-text-secondary hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600'
              )}
            >
              <link.icon size={18} className={active ? 'text-white' : 'text-text-muted'} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => { logout(); window.location.href = '/auth/login'; }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
