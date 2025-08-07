import type { BasicUsers, UserInfo } from '@/types/users';
import ProfileImage from '@/assets/images/image-profile-default.svg?url';
import type { OAuthProvider } from '@/types/auth';

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

/**
 * 애플 로그인 후 사용하는 가입 유저 데이터
 */
export const mockAppleUser: BasicUsers = {
  id: '11',
  nickname: 'appleUser',
  type: 'LOGIN',
};

/**
 * 구글 로그인 후 사용하는 가입 유저 데이터
 */
export const mockGoogleUser: BasicUsers = {
  id: '10',
  nickname: 'googleUser',
  type: 'LOGIN',
};

/**
 * 카카오 로그인 후 사용하는 미가입 유저 데이터
 */
export const mockPendingSocialUser: OAuthProvider = {
  providerType: 'KAKAO',
  providerId: '4359551911',
  type: 'SIGNUP',
};
