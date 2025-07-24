import type { OAuthProviderDTO } from '@/api/types/auth';
import type { SOCIAL_PROVIDER } from '@/constants/auth';
import type { SIGN_UP_STEP } from '@/constants/auth';

export type UserType = 'SIGNUP' | 'LOGIN';

export type SocialProvider =
  (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];

export type SignUpStep = (typeof SIGN_UP_STEP)[keyof typeof SIGN_UP_STEP];

export type OAuthProvider = OAuthProviderDTO;
