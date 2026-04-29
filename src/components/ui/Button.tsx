import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'honey';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<string, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-warm active:scale-95',
  secondary: 'bg-cream-100 text-primary-700 hover:bg-cream-200 border border-primary-200 dark:bg-primary-900 dark:text-cream-100 dark:hover:bg-primary-800 dark:border-primary-700',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-600 dark:hover:text-white',
  ghost: 'text-primary-700 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-primary-900/40',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95',
  honey: 'bg-honey text-primary-900 hover:bg-honey-dark font-semibold shadow-warm active:scale-95',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-1.5 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-sm gap-2',
  lg: 'px-8 py-3 text-base gap-2',
  xl: 'px-10 py-4 text-lg gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin shrink-0" />}
      {!loading && icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
