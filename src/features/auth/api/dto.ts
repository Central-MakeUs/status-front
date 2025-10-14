import type { SocialProvider, UserType } from '@/features/auth/model/types';

export interface OAuthLoginRequestDTO {
  provider: SocialProvider;
  code: string;
}

export interface OAuthProviderDTO {
  providerType: SocialProvider;
  providerId: string;
  type: UserType;
}
