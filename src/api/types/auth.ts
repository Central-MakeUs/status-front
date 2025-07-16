import type { UserInfoDTO } from '@/api/types/user';

export type SocialProvider = 'google' | 'apple' | 'kakao';

export interface AuthResponseDTO {
  user: UserInfoDTO;
}
