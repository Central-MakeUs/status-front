import type { UserInfoDTO } from '@/api/types/users';
import type { SocialProvider, UserType } from '@/types/auth';

export interface AuthResponseDTO {
  user: UserInfoDTO;
}

export interface AuthConfig {
  endpoint: string;
  clientId: string;
  redirectUri: string;
  responseType: string;
  scope?: string;
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
