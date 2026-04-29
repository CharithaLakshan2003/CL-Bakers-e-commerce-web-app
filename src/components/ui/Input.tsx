import { cn } from '@/lib/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({ label, error, hint, icon, iconRight, fullWidth, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">{icon}</span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full rounded-xl border bg-input-bg px-4 py-2.5 text-sm text-text-primary',
            'placeholder:text-text-muted transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600',
            error ? 'border-red-500 focus:ring-red-500' : 'border-border',
            icon && 'pl-10',
            iconRight && 'pr-10',
            className
          )}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">{iconRight}</span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export function Textarea({ label, error, hint, fullWidth, className, id, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          'w-full rounded-xl border bg-input-bg px-4 py-2.5 text-sm text-text-primary',
          'placeholder:text-text-muted transition-colors resize-none',
          'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600',
          error ? 'border-red-500' : 'border-border',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  );
}
