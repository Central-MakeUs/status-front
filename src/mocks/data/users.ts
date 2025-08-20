import type { BasicUsers } from '@/types/users';
import type { OAuthProvider } from '@/types/auth';

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

/**
 * 게스트 로그인 후 사용하는 유저 데이터
 */
export const mockGuestUser: BasicUsers = {
  id: '12',
  nickname: 'guestUser',
  type: 'LOGIN',
};
