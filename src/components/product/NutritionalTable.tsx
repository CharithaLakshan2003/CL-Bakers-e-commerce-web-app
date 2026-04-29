'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { NutritionalInfo } from '@/types';
import { cn } from '@/lib/utils';

export function NutritionalTable({ info }: { info: NutritionalInfo }) {
  const [open, setOpen] = useState(false);
  const rows = [
    { label: 'Calories', value: `${info.calories} kcal` },
    { label: 'Protein', value: info.protein },
    { label: 'Carbohydrates', value: info.carbs },
    { label: 'Fat', value: info.fat },
    { label: 'Dietary Fiber', value: info.fiber },
    { label: 'Sugar', value: info.sugar },
    { label: 'Sodium', value: info.sodium },
  ];

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-bg-secondary text-sm font-semibold text-text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer"
      >
        Nutritional Information (per serving)
        <ChevronDown size={16} className={cn('transition-transform text-text-muted', open && 'rotate-180')} />
      </button>
      {open && (
        <table className="w-full text-sm animate-fade-in">
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={cn('border-t border-border', i % 2 === 0 ? 'bg-bg-secondary' : 'bg-card-bg')}>
                <td className="px-4 py-2.5 text-text-secondary">{row.label}</td>
                <td className="px-4 py-2.5 text-text-primary font-medium text-right">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
