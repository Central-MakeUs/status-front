import type { SocialProvider } from '@/types/auth';
import type { TierType } from '@/types/tier';

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
