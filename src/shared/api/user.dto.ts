import type { TierType, UserType } from '../../entities/user/model/user';

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
