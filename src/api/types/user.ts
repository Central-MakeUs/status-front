import type { SocialProvider } from '@/api/types/auth';
import type { TierType } from '@/types/tier';

export interface UserInfoDTO {
  id: string;
  email: string;
  nickname: string;
  providerType: SocialProvider;
  providerId: string;
  tier: TierType;
  level: number;
  levelPercent: number;
  profileImageUrl: string;
}
