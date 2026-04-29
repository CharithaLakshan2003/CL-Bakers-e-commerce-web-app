import { mockProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/shop/ProductCard';
import type { Category } from '@/types';

export function RelatedProducts({ currentId, category }: { currentId: string; category: Category }) {
  const related = mockProducts.filter(p => p.id !== currentId && p.category === category).slice(0, 4);
  if (!related.length) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl font-bold text-text-primary mb-6">You May Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto">
        {related.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
