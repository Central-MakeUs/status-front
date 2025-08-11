import { create } from 'zustand';

import type { BasicUsers } from '@/types/users';
import type { OAuthProvider } from '@/types/auth';
import { devtools } from 'zustand/middleware';

interface AuthState {
  pendingSocialUser: OAuthProvider | null;
  user: BasicUsers | null;
  setPendingSocialUser: (pendingSocialUser: OAuthProvider | null) => void;
  setUser: (user: BasicUsers | null) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      pendingSocialUser: null,
      user: null,

      setPendingSocialUser: (pendingSocialUser: OAuthProvider | null) => {
        set(() => ({
          pendingSocialUser,
        }));
      },

      setUser: (user: BasicUsers | null) => {
        set(() => ({
          user,
        }));
      },
    }),
    {
      name: 'authStore',
      enabled: import.meta.env.DEV,
    }
  )
);
