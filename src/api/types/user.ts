import type { SocialProvider } from '@/api/types/auth';

export interface UserInfoDTO {
  id: string;
  email: string;
  nickname: string;
  providerType: SocialProvider;
  providerId: string;
  level: number;
  levelPercent: number;
  profileImageUrl: string;
}
