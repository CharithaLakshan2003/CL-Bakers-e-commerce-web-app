'use client';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const steps = [
  { id: 1, label: 'Information' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Confirmation' },
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all',
              step.id < currentStep ? 'bg-sage text-white' :
              step.id === currentStep ? 'bg-primary-600 text-white shadow-warm animate-pulse-warm' :
              'bg-border text-text-muted'
            )}>
              {step.id < currentStep ? <Check size={16} /> : step.id}
            </div>
            <p className={cn(
              'text-xs mt-1.5 font-medium whitespace-nowrap',
              step.id === currentStep ? 'text-primary-600' : step.id < currentStep ? 'text-sage' : 'text-text-muted'
            )}>{step.label}</p>
          </div>
          {i < steps.length - 1 && (
            <div className={cn('w-16 sm:w-24 h-0.5 mx-2 mb-4 transition-colors', step.id < currentStep ? 'bg-sage' : 'bg-border')} />
          )}
        </div>
      ))}
    </div>
  );
}
