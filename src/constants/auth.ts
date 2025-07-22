import type { AuthConfig } from '@/api/types/auth';
import type { SocialProvider } from '@/types/auth';

export const URL_SCHEME = import.meta.env.DEV
  ? 'exp://127.0.0.1:8081/--/'
  : 'statusapp://';

export const SOCIAL_PROVIDER = {
  GOOGLE: 'google',
  KAKAO: 'kakao',
} as const;

export const AUTH_CONFIGS: Record<SocialProvider, AuthConfig> = {
  [SOCIAL_PROVIDER.GOOGLE]: {
    endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    responseType: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.email',
  },
  [SOCIAL_PROVIDER.KAKAO]: {
    endpoint: 'https://kauth.kakao.com/oauth/authorize',
    clientId: import.meta.env.VITE_KAKAO_CLIENT_ID,
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    responseType: 'code',
  },
} as const;
