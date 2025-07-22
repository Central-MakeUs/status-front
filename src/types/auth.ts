import type { SOCIAL_PROVIDER } from '@/constants/auth';

export type SocialProvider =
  (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];
