import Link from 'next/link';
import Image from 'next/image';
import { useUserStore } from '@/stores/user.store';
import { LogOut, ChefHat } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BakerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { logout } = useUserStore();

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="bg-primary-900 text-white p-4 flex justify-between items-center shadow-warm">
        <Link href="/" className="font-display font-bold text-xl flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/logo1.png" alt="Logo" fill className="object-contain" />
          </div>
          CL Bakers Baker Terminal
        </Link>
        <button
          onClick={() => { logout(); router.push('/auth/login'); }}
          className="flex items-center gap-2 text-sm hover:text-honey transition-colors cursor-pointer"
        >
          <LogOut size={16} /> Exit Terminal
        </button>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
