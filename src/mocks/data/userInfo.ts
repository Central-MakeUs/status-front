import type { UserInfo } from '@/types/users';
import ProfileImage from '@/assets/image.svg?url';

export const mockUserInfo: UserInfo = {
  id: '10',
  email: 'mock@google.',
  nickname: '닉네임_10904',
  providerType: 'GOOGLE',
  providerId: 'mock-provider-id',
  tier: 'Platinum',
  level: 1,
  profileImageUrl: ProfileImage,
};
