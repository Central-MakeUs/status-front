import type { TierType } from '@/types/tier';

export interface UserInfoDTO {
  nickname: string;
  tier: TierType;
  level: number;
  levelPercent: number;
  profileImageUrl: string;
}
