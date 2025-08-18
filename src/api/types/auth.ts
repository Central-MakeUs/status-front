import type { SocialProvider, UserType } from '@/types/auth';

export interface OAuthLoginRequestDTO {
  provider: SocialProvider;
  code: string;
}

export interface OAuthProviderDTO {
  providerType: SocialProvider;
  providerId: string;
  type: UserType;
}
