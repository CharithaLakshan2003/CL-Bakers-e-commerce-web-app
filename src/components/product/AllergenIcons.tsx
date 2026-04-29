import { Wheat, Milk, Nut, Egg } from 'lucide-react';
import type { Allergen } from '@/types';
import { cn } from '@/lib/utils';

const allergenConfig: Record<Allergen, { label: string; icon: string; color: string }> = {
  gluten: { label: 'Gluten', icon: '🌾', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  dairy: { label: 'Dairy', icon: '🥛', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  nuts: { label: 'Nuts', icon: '🥜', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  eggs: { label: 'Eggs', icon: '🥚', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  soy: { label: 'Soy', icon: '🌱', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  sesame: { label: 'Sesame', icon: '🌿', color: 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300' },
};

export function AllergenIcons({ allergens }: { allergens: Allergen[] }) {
  if (!allergens.length) return (
    <div className="flex items-center gap-2 text-sage text-sm">
      <span>✅</span>
      <span>No major allergens</span>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-2">
      {allergens.map(a => {
        const cfg = allergenConfig[a];
        if (!cfg) return null;
        return (
          <span key={a} className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', cfg.color)}>
            <span>{cfg.icon}</span>
            {cfg.label}
          </span>
        );
      })}
    </div>
  );
}
