'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
    setLoading(false);
    setEmail('');
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden bg-primary-600 p-8 sm:p-12 lg:p-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,193,7,0.15),transparent_60%)]" />
          <div className="relative">
            {/* <span className="text-4xl mb-4 block">✉️</span> */}
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Get Weekly Specials
            </h2>
            <p className="text-white/75 text-base mb-8 max-w-md mx-auto">
              Be first to hear about seasonal specials, new products, and exclusive member discounts.
            </p>

            {status === 'success' ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white font-medium animate-fade-in">
                <CheckCircle size={18} className="text-honey" />
                You&apos;re subscribed! Welcome to the family 🥐
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/50 text-sm focus:outline-none focus:bg-white/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 bg-honey text-primary-900 rounded-full text-sm font-bold hover:bg-honey-dark transition-colors disabled:opacity-60 cursor-pointer shrink-0"
                >
                  {loading ? <span className="w-4 h-4 border-2 border-primary-900/30 border-t-primary-900 rounded-full animate-spin" /> : <Send size={14} />}
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
