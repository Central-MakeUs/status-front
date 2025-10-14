import type { UserType } from '@/features/auth/model/types';
import type { OAuthProviderDTO } from '@/features/auth/api/dto';
import type { TierType } from '@/entities/tier/model/types';

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
