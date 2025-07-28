import type { SocialProvider, UserType } from '@/types/auth';
import type { TierType } from '@/types/tier';
import type { OAuthProviderDTO } from './auth';

export interface UserInfoDTO {
  id: string;
  email: string;
  nickname: string;
  providerType: SocialProvider;
  providerId: string;
  tier: TierType;
  level: number;
  profileImageUrl: string;
}

export interface SignUpRequestDTO {
  nickname: string;
  provider: OAuthProviderDTO;
}

export interface BasicUsersDTO {
  id: string;
  nickname: string;
  type: UserType;
}
