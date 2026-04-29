import Image from 'next/image';
import { mockReviews } from '@/lib/mock-data';
import { StarRating } from '@/components/ui/StarRating';
import { formatDate } from '@/lib/utils';
import { CheckCircle, MessageCircle } from 'lucide-react';

const faqs = [
  { q: 'How should I store this product?', a: 'Store in an airtight container at room temperature for up to 3 days, or freeze for up to 3 months. For best flavour, consume within 24 hours of purchase.' },
  { q: 'Can I freeze this product?', a: 'Yes! Most of our products freeze well. Wrap tightly in cling film and place in a freezer bag. Defrost at room temperature for 2-3 hours before serving.' },
  { q: 'Can I request a custom version of this product?', a: 'For cakes and some pastries, yes! Use our Custom Cake Request form or contact us directly at hello@clbakers.com.' },
];

export function ReviewSection({ productId }: { productId: string }) {
  const reviews = mockReviews.filter(r => r.productId === productId);
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="space-y-8">
      {/* Tabs header */}
      <div className="flex gap-6 border-b border-border">
        {[
          { label: `Reviews (${reviews.length})`, active: true },
          { label: 'FAQ', active: false },
        ].map(t => (
          <button key={t.label}
            className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${t.active ? 'border-primary-600 text-primary-600' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Rating summary */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-6 p-5 bg-bg-secondary rounded-2xl">
          <div className="text-center">
            <p className="font-display text-5xl font-bold text-primary-600">{avgRating.toFixed(1)}</p>
            <StarRating rating={avgRating} size="sm" className="justify-center mt-1" />
            <p className="text-xs text-text-muted mt-1">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map(s => {
              const count = reviews.filter(r => Math.floor(r.rating) === s).length;
              const pct = reviews.length ? (count / reviews.length) * 100 : 0;
              return (
                <div key={s} className="flex items-center gap-2 text-xs">
                  <span className="text-text-muted w-4 text-right">{s}</span>
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-honey rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-text-muted w-4">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Review cards */}
      {reviews.length === 0 ? (
        <div className="text-center py-10">
          <MessageCircle size={40} className="mx-auto text-border mb-3" />
          <h3 className="font-semibold text-text-primary mb-1">No reviews yet</h3>
          <p className="text-text-muted text-sm">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="p-5 bg-card-bg border border-border rounded-2xl">
              <div className="flex items-start gap-3 mb-3">
                {r.userImage && (
                  <Image src={r.userImage} alt={r.userName} width={40} height={40} className="rounded-full object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-text-primary text-sm">{r.userName}</p>
                    {r.verifiedPurchase && (
                      <span className="flex items-center gap-1 text-xs text-sage">
                        <CheckCircle size={11} /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={r.rating} size="sm" />
                    <span className="text-xs text-text-muted">{formatDate(r.createdAt)}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* FAQ */}
      <div>
        <h3 className="font-display text-xl font-bold text-text-primary mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map(faq => (
            <div key={faq.q} className="p-4 bg-bg-secondary rounded-xl">
              <p className="font-semibold text-text-primary text-sm mb-1.5">Q: {faq.q}</p>
              <p className="text-text-muted text-sm leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
