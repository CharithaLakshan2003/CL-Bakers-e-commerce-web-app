'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/lib/zod-schemas';
import { useUserStore } from '@/stores/user.store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import * as z from 'zod';
import { Save, Gift } from 'lucide-react';

export default function ProfilePage() {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      birthday: user?.birthday || '',
    }
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, phone: user.phone || '', birthday: user.birthday || '' });
    }
  }, [user, reset]);

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    setLoading(true);
    setSuccess(false);
    await new Promise(r => setTimeout(r, 800));
    
    if (user) {
      setUser({ ...user, ...data });
    }
    
    setSuccess(true);
    setLoading(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-text-primary">Profile Details</h1>
      
      <div className="bg-card-bg border border-border rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input {...register('name')} label="Full Name" error={errors.name?.message} />
            <Input {...register('email')} label="Email Address" type="email" error={errors.email?.message} disabled hint="Contact support to change email" />
            <Input {...register('phone')} label="Phone Number" type="tel" error={errors.phone?.message} />
            <Input 
              {...register('birthday')} 
              label="Birthday" 
              type="date" 
              error={errors.birthday?.message} 
              hint="Get a 5% discount on your birthday month!"
            />
          </div>

          <div className="pt-6 border-t border-border flex items-center justify-between">
            <p className="text-sm text-text-muted flex items-center gap-1">
              <Gift size={16} className="text-honey" /> Join date: {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
            </p>
            <div className="flex items-center gap-4">
              {success && <span className="text-sm font-medium text-sage">Saved successfully!</span>}
              <Button type="submit" loading={loading} icon={<Save size={16} />}>Save Changes</Button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-card-bg border border-border rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="font-bold text-text-primary text-lg">Password & Security</h2>
        <p className="text-sm text-text-muted mb-4">Update your password to keep your account secure.</p>
        <Button variant="outline">Change Password</Button>
      </div>
    </div>
  );
}
