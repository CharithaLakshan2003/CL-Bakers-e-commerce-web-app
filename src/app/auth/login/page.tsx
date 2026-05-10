'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/zod-schemas';
import { useUserStore } from '@/stores/user.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import * as z from 'zod';

import { signIn, getSession } from 'next-auth/react';
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setError('');
    
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      const session = await getSession();
      if (session?.user) {
        useUserStore.getState().setUser(session.user as any);
      }
      router.push('/account');
      router.refresh();
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
          <h2 className="text-center font-display text-3xl font-bold text-text-primary">Welcome back</h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Sign in to access your orders and saved items
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary cursor-pointer">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot password?
              </a>
            </div>
          </div>

          <Button fullWidth size="lg" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card-bg text-text-muted">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button fullWidth variant="outline" className="text-text-primary border-border" onClick={() => signIn('google', { callbackUrl: '/account' })} type="button">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-text-secondary">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
