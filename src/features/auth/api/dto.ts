import type { SocialProvider } from '@/features/auth/model/types';
import type { UserType } from '@/entities/users/model/types';

export interface SignUpRequestDTO {
  nickname: string;
  provider: OAuthProviderDTO;
}

export interface OAuthLoginRequestDTO {
  provider: SocialProvider;
  code: string;
}

export interface OAuthProviderDTO {
  providerType: SocialProvider;
  providerId: string;
  type: UserType;
}
