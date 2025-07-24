import type { AuthConfig } from '@/api/types/auth';
import type { SocialProvider } from '@/types/auth';

export const URL_SCHEME = import.meta.env.DEV
  ? 'exp://127.0.0.1:8081/--/'
  : 'statusapp://';

export const SOCIAL_PROVIDER = {
  GOOGLE: 'GOOGLE',
  KAKAO: 'KAKAO',
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
export const SIGN_UP_STEP = {
  NICKNAME: 'nickname',
  TERMS_AND_PRIVACY_POLICY: 'termsAndPrivacyPolicy',
} as const;

export const SIGN_UP_STEP_INFO = {
  [SIGN_UP_STEP.NICKNAME]: {
    title: '앞으로 어떻게 불러드릴까요?',
    description: '나중에 마이페이지에서 수정이 가능해요.',
  },
  [SIGN_UP_STEP.TERMS_AND_PRIVACY_POLICY]: {
    title: '상태창에 오신 것을 환영해요!\n육각형 인간이 될 준비가 되었나요?',
    description: '약관 동의 후, 본격적인 상태창의 이용 방법을 알려드릴게요',
  },
} as const;

export const NICKNAME_MAX_LENGTH = 10;

export const USER_TYPE = {
  SIGN_UP: 'SIGNUP',
  LOGIN: 'LOGIN',
} as const;
