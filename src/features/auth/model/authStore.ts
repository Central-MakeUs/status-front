import { create } from 'zustand';

import type { BasicUsers } from '@/entities/users/model/types';
import type { OAuthProvider } from '@/features/auth/model/types';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  pendingSocialUser: OAuthProvider | null;
  user: BasicUsers | null;
  setPendingSocialUser: (pendingSocialUser: OAuthProvider | null) => void;
  setUser: (user: BasicUsers | null) => void;
}

interface SocialConnectionState {
  tempSocialConnection: boolean | null;
  setTempSocialConnection: (tempSocialConnection: boolean | null) => void;
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

/**
 * [TODO] 앱 재배포 후 제거
 */
export const useSocialConnectionStore = create<SocialConnectionState>()(
  devtools(
    persist(
      (set) => ({
        tempSocialConnection: null,
        setTempSocialConnection: (tempSocialConnection: boolean | null) => {
          set(() => ({ tempSocialConnection }));
        },
      }),
      {
        name: 'social-connection',
      }
    )
  )
);
