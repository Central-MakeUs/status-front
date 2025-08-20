import type { UserType } from '@/types/auth';
import type { OAuthProviderDTO } from './auth';
import type { TierType } from '@/types/tier';

export interface SignUpRequestDTO {
  nickname: string;
  provider: OAuthProviderDTO;
}

export interface BasicUsersDTO {
  id: string;
  nickname: string;
  providerType: string;
  tier: TierDTO;
  type: UserType;
}

export interface TierDTO {
  tier: TierType;
  level: number;
}
