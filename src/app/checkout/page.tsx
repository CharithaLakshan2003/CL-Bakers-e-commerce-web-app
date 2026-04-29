'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StepIndicator } from '@/components/checkout/StepIndicator';
import { useCartStore } from '@/stores/cart.store';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { pickupBranches, pickupTimeSlots } from '@/lib/mock-data';
import { MapPin, Truck, CreditCard, CheckCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

type DeliveryMethod = 'PICKUP' | 'DELIVERY';

interface CheckoutInfo {
  email: string; phone: string; firstName: string; lastName: string;
  deliveryMethod: DeliveryMethod; pickupBranch: string; pickupTimeSlot: string;
  street: string; city: string; postalCode: string;
  specialInstructions: string;
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<CheckoutInfo>({
    email: '', phone: '', firstName: '', lastName: '',
    deliveryMethod: 'PICKUP', pickupBranch: pickupBranches[0].id, pickupTimeSlot: pickupTimeSlots[0],
    street: '', city: '', postalCode: '', specialInstructions: '',
  });

  const { items, subtotal, tax, shippingFee, total, couponCode, discount } = useCartStore();
  const sub = subtotal();
  const ship = shippingFee(info.deliveryMethod);
  const taxAmt = tax(sub);
  const tot = total(info.deliveryMethod);

  const updateInfo = (field: Partial<CheckoutInfo>) => setInfo(prev => ({ ...prev, ...field }));

  const handlePayhere = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    // In production: create order → get Payhere hash → redirect
    // For demo: proceed to confirmation
    setStep(3);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container-custom max-w-5xl">
          <h1 className="font-display text-4xl font-bold text-text-primary mb-8 text-center">Checkout</h1>
          <StepIndicator currentStep={step} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: steps */}
            <div className="lg:col-span-2 space-y-6">

              {/* Step 1 */}
              {step === 1 && (
                <div className="bg-card-bg border border-border rounded-2xl p-6 space-y-6 animate-fade-in-up">
                  <h2 className="font-display text-xl font-bold text-text-primary">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="First Name" value={info.firstName} onChange={e => updateInfo({ firstName: e.target.value })} required />
                    <Input label="Last Name" value={info.lastName} onChange={e => updateInfo({ lastName: e.target.value })} required />
                    <Input label="Email" type="email" value={info.email} onChange={e => updateInfo({ email: e.target.value })} required />
                    <Input label="Phone" type="tel" value={info.phone} onChange={e => updateInfo({ phone: e.target.value })} required />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-3">Delivery Method</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {([
                        { value: 'PICKUP', icon: MapPin, title: 'Pickup', desc: 'Free — Ready in 2–4 hours' },
                        { value: 'DELIVERY', icon: Truck, title: 'Delivery', desc: sub >= 30 ? 'Free (over $30)' : '$5.00 delivery fee' },
                      ] as const).map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => updateInfo({ deliveryMethod: opt.value })}
                          className={cn(
                            'flex items-center gap-3 p-4 border-2 rounded-xl text-left transition-all cursor-pointer',
                            info.deliveryMethod === opt.value
                              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-border hover:border-primary-300'
                          )}
                        >
                          <opt.icon size={20} className={info.deliveryMethod === opt.value ? 'text-primary-600' : 'text-text-muted'} />
                          <div>
                            <p className={cn('font-semibold text-sm', info.deliveryMethod === opt.value ? 'text-primary-600' : 'text-text-primary')}>{opt.title}</p>
                            <p className="text-xs text-text-muted">{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {info.deliveryMethod === 'PICKUP' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-text-secondary mb-1 block">Pickup Branch</label>
                        <select
                          value={info.pickupBranch}
                          onChange={e => updateInfo({ pickupBranch: e.target.value })}
                          className="w-full px-4 py-2.5 border border-border rounded-xl bg-input-bg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-600"
                        >
                          {pickupBranches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-text-secondary mb-1 block">Pickup Time</label>
                        <select
                          value={info.pickupTimeSlot}
                          onChange={e => updateInfo({ pickupTimeSlot: e.target.value })}
                          className="w-full px-4 py-2.5 border border-border rounded-xl bg-input-bg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-600"
                        >
                          {pickupTimeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Input label="Street Address" fullWidth value={info.street} onChange={e => updateInfo({ street: e.target.value })} required />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="City" value={info.city} onChange={e => updateInfo({ city: e.target.value })} required />
                        <Input label="Postal Code" value={info.postalCode} onChange={e => updateInfo({ postalCode: e.target.value })} required />
                      </div>
                    </div>
                  )}

                  <Textarea label="Special Instructions" fullWidth value={info.specialInstructions} onChange={e => updateInfo({ specialInstructions: e.target.value })} rows={3} placeholder="Allergies, delivery notes, etc." />

                  <Button fullWidth size="lg" onClick={() => setStep(2)}>Continue to Payment</Button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="bg-card-bg border border-border rounded-2xl p-6 space-y-6 animate-fade-in-up">
                  <h2 className="font-display text-xl font-bold text-text-primary flex items-center gap-2">
                    <CreditCard size={20} className="text-primary-600" /> Payment
                  </h2>

                  <div className="p-5 bg-cream-100 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl">
                    <p className="font-semibold text-text-primary mb-2 text-sm">Payhere Secure Payment</p>
                    <p className="text-text-muted text-sm leading-relaxed">
                      You will be redirected to Payhere&apos;s secure payment gateway to complete your purchase. We accept Visa, Mastercard, and other major cards.
                    </p>
                    <div className="flex gap-2 mt-3">
                      {['VISA', 'MC', 'AMEX'].map(c => (
                        <span key={c} className="px-2.5 py-1 bg-white dark:bg-primary-800 border border-border rounded-lg text-xs font-bold text-text-secondary">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-bg-secondary rounded-xl text-sm space-y-2">
                    <p className="font-semibold text-text-primary">Order Review</p>
                    {items.map(i => (
                      <div key={i.id} className="flex justify-between text-text-secondary">
                        <span>{i.product.name} × {i.quantity}</span>
                        <span>{formatPrice(i.product.price * i.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 flex justify-between font-bold text-text-primary">
                      <span>Total</span>
                      <span className="text-primary-600">{formatPrice(tot)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary" size="lg" onClick={() => setStep(1)}>← Back</Button>
                    <Button fullWidth size="lg" loading={loading} onClick={handlePayhere} icon={<ExternalLink size={16} />} iconPosition="right">
                      Pay {formatPrice(tot)} via Payhere
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="bg-card-bg border border-border rounded-2xl p-8 text-center space-y-5 animate-fade-in-up">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                    <CheckCircle size={40} className="text-sage" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-text-primary">Order Confirmed! 🥐</h2>
                  <p className="text-text-muted">Thank you, {info.firstName}! Your order has been placed. We&apos;ll send a confirmation to <strong>{info.email}</strong>.</p>
                  <div className="inline-block px-6 py-3 bg-primary-50 dark:bg-primary-900/30 rounded-xl">
                    <p className="text-sm text-text-muted">Order Number</p>
                    <p className="font-display text-xl font-bold text-primary-600">BKR-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap mt-2">
                    <a href="/account/orders" className="px-6 py-2.5 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors">View Orders</a>
                    <a href="/shop" className="px-6 py-2.5 border border-border text-text-secondary rounded-full text-sm font-medium hover:border-primary-400 transition-colors">Continue Shopping</a>
                  </div>
                </div>
              )}
            </div>

            {/* Right: mini order summary */}
            <div className="bg-card-bg border border-border rounded-2xl p-5 space-y-4 h-fit sticky top-28">
              <h3 className="font-semibold text-text-primary text-sm">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {items.slice(0, 3).map(i => (
                  <div key={i.id} className="flex justify-between gap-2 text-text-secondary">
                    <span className="truncate">{i.product.name} ×{i.quantity}</span>
                    <span className="shrink-0">{formatPrice(i.product.price * i.quantity)}</span>
                  </div>
                ))}
                {items.length > 3 && <p className="text-text-muted text-xs">+{items.length - 3} more items</p>}
              </div>
              <div className="border-t border-border pt-3 space-y-1 text-sm">
                <div className="flex justify-between text-text-muted"><span>Subtotal</span><span>{formatPrice(sub)}</span></div>
                <div className="flex justify-between text-text-muted"><span>Shipping</span><span>{ship === 0 ? 'Free' : formatPrice(ship)}</span></div>
                <div className="flex justify-between text-text-muted"><span>Tax</span><span>{formatPrice(taxAmt)}</span></div>
                {discount > 0 && <div className="flex justify-between text-sage"><span>Coupon</span><span>-{formatPrice(discount)}</span></div>}
                <div className="flex justify-between font-bold text-text-primary pt-1 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary-600">{formatPrice(tot)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
