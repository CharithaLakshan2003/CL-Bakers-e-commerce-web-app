'use client';

import { useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useUserStore } from '@/stores/user.store';

export function SessionSync() {
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user) {
        setUser(session.user as any);
      } else if (isLoggedIn) {
        logout();
      }
    });
  }, [setUser, logout, isLoggedIn]);

  return null;
}
