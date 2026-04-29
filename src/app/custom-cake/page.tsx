'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StepIndicator } from '@/components/checkout/StepIndicator';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customCakeSchema } from '@/lib/zod-schemas';
import * as z from 'zod';

export default function CustomCakePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm<z.infer<typeof customCakeSchema>>({
    resolver: zodResolver(customCakeSchema),
    mode: 'onChange',
    defaultValues: { deliveryMethod: 'PICKUP' }
  });

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ['cakeType', 'size'];
    if (step === 2) fieldsToValidate = ['flavor', 'filling', 'frostingType'];
    if (step === 3) fieldsToValidate = ['eventDate', 'budget'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(s => Math.min(4, s + 1));
  };

  const onSubmit = async (data: z.infer<typeof customCakeSchema>) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    console.log('Cake Request:', data);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="pt-28 pb-16 min-h-screen">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-text-primary mb-3">Custom Cake Inquiry</h1>
            <p className="text-text-muted">Let us bring your dream cake to life. Fill out the details below for a quote.</p>
          </div>

          {submitted ? (
            <div className="bg-card-bg border border-border rounded-2xl p-10 text-center animate-fade-in-up">
              <CheckCircle size={60} className="mx-auto text-sage mb-4" />
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Request Received!</h2>
              <p className="text-text-secondary mb-6">Thank you! Our head baker will review your request and send a quote within 48 hours.</p>
              <Button onClick={() => window.location.href = '/'}>Return to Home</Button>
            </div>
          ) : (
            <div className="bg-card-bg border border-border rounded-2xl p-6 sm:p-10 shadow-warm">
              <div className="flex justify-between text-xs font-bold text-text-muted mb-6">
                <span className={step >= 1 ? 'text-primary-600' : ''}>1. Basics</span>
                <span className={step >= 2 ? 'text-primary-600' : ''}>2. Flavors</span>
                <span className={step >= 3 ? 'text-primary-600' : ''}>3. Details</span>
                <span className={step >= 4 ? 'text-primary-600' : ''}>4. Review</span>
              </div>
              <div className="h-1 bg-border rounded-full mb-8 overflow-hidden">
                <div className="h-full bg-primary-600 transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }} />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="text-sm font-semibold text-text-primary block mb-2">Cake Type</label>
                      <select {...register('cakeType')} className="w-full px-4 py-3 border border-border rounded-xl bg-input-bg focus:ring-2 focus:ring-primary-600">
                        <option value="">Select type...</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.cakeType && <p className="text-xs text-red-500 mt-1">{errors.cakeType.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary block mb-2">Size / Servings</label>
                      <select {...register('size')} className="w-full px-4 py-3 border border-border rounded-xl bg-input-bg focus:ring-2 focus:ring-primary-600">
                        <option value="">Select size...</option>
                        <option value="6 inch (8-10 servings)">6" Round (8-10 servings)</option>
                        <option value="8 inch (12-16 servings)">8" Round (12-16 servings)</option>
                        <option value="10 inch (20-25 servings)">10" Round (20-25 servings)</option>
                        <option value="Tiered">Tiered (Custom size)</option>
                      </select>
                      {errors.size && <p className="text-xs text-red-500 mt-1">{errors.size.message}</p>}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <Input {...register('flavor')} label="Cake Flavor" placeholder="e.g. Vanilla Bean, Devil's Food..." error={errors.flavor?.message} />
                    <Input {...register('filling')} label="Filling" placeholder="e.g. Raspberry compote, Lemon curd..." error={errors.filling?.message} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input {...register('frostingType')} label="Frosting Type" placeholder="e.g. Swiss Meringue" error={errors.frostingType?.message} />
                      <Input {...register('frostingColor')} label="Frosting Color" placeholder="e.g. Pastel Pink" error={errors.frostingColor?.message} />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                      <Input {...register('eventDate')} type="date" label="Event Date" error={errors.eventDate?.message} />
                      <Input {...register('budget')} label="Estimated Budget ($)" placeholder="e.g. 150" error={errors.budget?.message} />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary block mb-2">Delivery Method</label>
                      <select {...register('deliveryMethod')} className="w-full px-4 py-3 border border-border rounded-xl bg-input-bg focus:ring-2 focus:ring-primary-600">
                        <option value="PICKUP">Pickup from Bakery</option>
                        <option value="DELIVERY">Delivery</option>
                      </select>
                    </div>
                    <Textarea {...register('designText')} label="Design Ideas / Theme" rows={4} placeholder="Describe your vision..." />
                    
                    {/* Mock file upload */}
                    <div>
                      <label className="text-sm font-semibold text-text-primary block mb-2">Reference Images</label>
                      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary-400 transition-colors cursor-pointer bg-bg-secondary">
                        <UploadCloud size={24} className="mx-auto text-text-muted mb-2" />
                        <p className="text-sm text-text-secondary">Click or drag images here to upload</p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4 animate-fade-in text-sm bg-bg-secondary p-6 rounded-xl border border-border">
                    <h3 className="font-bold text-lg text-text-primary mb-4">Review Your Request</h3>
                    <p><strong>Type:</strong> <span className="text-text-muted">(Filled from form)</span></p>
                    <p><strong>Size:</strong> <span className="text-text-muted">(Filled from form)</span></p>
                    <p><strong>Date:</strong> <span className="text-text-muted">(Filled from form)</span></p>
                    <p className="text-xs text-text-muted mt-4 border-t border-border pt-4">By submitting, you agree that this is a quote request, not a confirmed order.</p>
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t border-border mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={() => setStep(s => s - 1)}>Back</Button>
                  ) : <div />}
                  
                  {step < 4 ? (
                    <Button type="button" onClick={nextStep}>Next Step</Button>
                  ) : (
                    <Button type="submit" loading={loading} icon={<CheckCircle size={16} />}>Submit Request</Button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
