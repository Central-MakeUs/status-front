import { create } from 'zustand';

import type { BasicUsers } from '@/types/users';
import type { OAuthProvider } from '@/types/auth';
import { devtools } from 'zustand/middleware';

interface AuthState {
  pendingSocialUser: OAuthProvider | null;
  user: BasicUsers | null;
  isAuthenticated: boolean;
  setPendingSocialUser: (pendingSocialUser: OAuthProvider | null) => void;
  setUser: (user: BasicUsers | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      pendingSocialUser: null,
      user: null,
      isAuthenticated: false,

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

      setIsAuthenticated: (isAuthenticated: boolean) => {
        set(() => ({
          isAuthenticated,
        }));
      },

      clear: () => {
        set(() => ({
          pendingSocialUser: null,
          user: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: 'authStore',
      enabled: import.meta.env.DEV,
    }
  )
);
