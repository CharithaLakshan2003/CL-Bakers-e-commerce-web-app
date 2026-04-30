import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price to currency string */
export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Format date to readable string */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(new Date(dateStr));
}

/** Relative time (e.g. "2 days ago") */
export function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, 'year'], [2592000, 'month'], [86400, 'day'],
    [3600, 'hour'], [60, 'minute'], [1, 'second'],
  ];
  for (const [divisor, label] of intervals) {
    const count = Math.floor(seconds / divisor);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

/** Truncate string with ellipsis */
export function truncate(str: string, maxLength: number): string {
  return str.length > maxLength ? str.slice(0, maxLength) + '…' : str;
}

/** Generate order ID */
export function generateOrderId(): string {
  return `BKR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

/** Slugify a string */
export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/** Calculate discount percentage */
export function discountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Check if product is low stock */
export function isLowStock(stock: number): boolean {
  return stock > 0 && stock < 5;
}

/** Get order status color */
export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    CONFIRMED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    BAKING: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    READY_FOR_PICKUP: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    REFUNDED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  };
  return map[status] ?? 'bg-gray-100 text-gray-800';
}

/** Format order status to human readable */
export function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Loyalty points to dollar value */
export function pointsToDollars(points: number): number {
  return (points / 100) * 5;
}

/** Dollars to loyalty points */
export function dollarsToPoints(amount: number): number {
  return Math.floor(amount);
}

/** Format timestamp or date string to readable time (e.g. 10:30 AM) */
export function formatTime(dateVal: string | number | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateVal));
}
