import { create } from 'zustand';
import type { UserInfo } from '@/types/users';
import { getCurrentUser, refreshTokens, logout as logoutAPI } from '@/api/auth';
import { getCookie } from '@/utils/cookie';

import type { OAuthProvider, SocialProvider } from '@/types/auth';

interface AuthState {
  pendingSocialUser: OAuthProvider | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  setPendingSocialUser: (pendingSocialUser: OAuthProvider | null) => void;
  loginWith: (provider: SocialProvider) => Promise<boolean>;
  logout: () => Promise<boolean>;
  initializeAuth: () => Promise<boolean>;
  refreshAuth: () => Promise<boolean>;

  _setAuthSuccess: (user: UserInfo | null) => void;
  _setAuthError: () => void;
  _setLoading: (loading: boolean) => void;
  _clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  pendingSocialUser: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isError: false,

  setPendingSocialUser: (pendingSocialUser: OAuthProvider | null) => {
    set(() => ({
      pendingSocialUser,
    }));
  },

  _setAuthSuccess: (user: UserInfo | null) => {
    set((state) => ({
      ...state,
      user,
      isAuthenticated: !!user,
      isLoading: false,
      isError: false,
    }));
  },

  _setAuthError: () => {
    set((state) => ({
      ...state,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isError: true,
    }));
  },

  _setLoading: (loading: boolean) => {
    set((state) => ({
      ...state,
      isLoading: loading,
      isError: false,
    }));
  },

  _clearAuth: () => {
    set((state) => ({
      ...state,
      user: null,
      isAuthenticated: false,
    }));
  },

  loginWith: async (provider: SocialProvider): Promise<boolean> => {
    const { _setLoading, _setAuthSuccess, _setAuthError } = get();

    try {
      _setLoading(true);

      // [TODO] OAuth 구현
      void provider;

      const response = await getCurrentUser();
      const user = response.data ?? null;

      _setAuthSuccess(user);
      return true;
    } catch (error) {
      _setAuthError();
      throw error;
    }
  },

  logout: async (): Promise<boolean> => {
    const { _setLoading, _setAuthSuccess, _setAuthError, _clearAuth } = get();

    try {
      _setLoading(true);

      await logoutAPI();
      _clearAuth();
      _setAuthSuccess(null);
      return true;
    } catch (error) {
      _clearAuth();
      _setAuthError();
      throw error;
    }
  },

  initializeAuth: async (): Promise<boolean> => {
    const { _setLoading, _setAuthSuccess, _setAuthError, refreshAuth } = get();

    try {
      _setLoading(true);

      const hasAuthCookie = getCookie('auth_status') === 'true';

      if (!hasAuthCookie) {
        _setAuthSuccess(null);
        return true;
      }

      try {
        const response = await getCurrentUser();
        const user = response.data ?? null;
        _setAuthSuccess(user);
        return true;
      } catch {
        return await refreshAuth();
      }
    } catch (error) {
      _setAuthError();
      throw error;
    }
  },

  refreshAuth: async (): Promise<boolean> => {
    const { _setAuthSuccess, _setAuthError, _clearAuth } = get();

    try {
      const hasAuthCookie = getCookie('auth_status') === 'true';

      if (!hasAuthCookie) {
        _clearAuth();
        return false;
      }

      const response = await refreshTokens();
      const authData = response.data;

      if (authData?.user) {
        _setAuthSuccess(authData.user);
        return true;
      }

      _clearAuth();
      return false;
    } catch (error) {
      _clearAuth();
      _setAuthError();
      throw error;
    }
  },
}));
