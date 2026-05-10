'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/zod-schemas';
import { useUserStore } from '@/stores/user.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import * as z from 'zod';

import { registerUser } from '../actions';
import { signIn, getSession } from 'next-auth/react';
export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);
    setError('');
    
    const result = await registerUser(data);
    
    if (result.success) {
      // Log them in
      const signInResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        setError(signInResult.error);
        setLoading(false);
      } else {
        const session = await getSession();
        if (session?.user) {
          useUserStore.getState().setUser(session.user as any);
        }
        router.push('/account');
        router.refresh();
      }
    } else {
      setError(result.error || 'Failed to register');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-bg">
      <div className="max-w-md w-full space-y-8 bg-card-bg p-8 rounded-2xl shadow-warm border border-border">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-600 mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="relative w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center mx-auto mb-4 overflow-hidden p-3">
            <Image src="/logo1.png" alt="CL Bakers Logo" fill className="object-contain" priority/>
          </div>
          <h2 className="text-center font-display text-3xl font-bold text-text-primary">Create an account</h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Join today and get 50 loyalty points instantly!
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input 
              {...register('name')}
              label="Full Name"
              type="text"
              placeholder="John Doe"
              error={errors.name?.message}
              icon={<User size={18} />}
            />
            <Input 
              {...register('email')}
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              icon={<Mail size={18} />}
            />
            <Input 
              {...register('password')}
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              icon={<Lock size={18} />}
            />
          </div>

          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">{error}</div>}

          <Button fullWidth size="lg" type="submit" loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-text-secondary pt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
