import type { BasicUsers } from '@/types/users';
import type { OAuthProvider } from '@/types/auth';
import {
  PROVIDER_TYPE,
  SOCIAL_PROVIDER,
  USER_TYPE,
} from '@/features/auth/config/constants';
import { TIER_TYPE } from '@/entities/tier/config/constants';

/**
 * 애플 로그인 후 사용하는 가입 유저 데이터
 */
export const mockAppleUser: BasicUsers = {
  id: '11',
  nickname: 'appleUser',
  type: USER_TYPE.LOGIN,
  providerType: PROVIDER_TYPE.SOCIAL,
  tier: {
    tier: TIER_TYPE.BRONZE,
    level: 1,
  },
};

/**
 * 구글 로그인 후 사용하는 가입 유저 데이터
 */
export const mockGoogleUser: BasicUsers = {
  id: '10',
  nickname: 'googleUser',
  type: USER_TYPE.LOGIN,
  providerType: PROVIDER_TYPE.SOCIAL,
  tier: {
    tier: TIER_TYPE.BRONZE,
    level: 1,
  },
};

/**
 * 카카오 로그인 후 사용하는 미가입 유저 데이터
 */
export const mockPendingSocialUser: OAuthProvider = {
  providerType: SOCIAL_PROVIDER.KAKAO,
  providerId: '4359551911',
  type: USER_TYPE.SIGN_UP,
};

/**
 * 게스트 로그인 후 사용하는 유저 데이터
 */
export const mockGuestUser: BasicUsers = {
  id: '12',
  nickname: 'guestUser',
  type: USER_TYPE.LOGIN,
  providerType: PROVIDER_TYPE.GUEST,
  tier: {
    tier: TIER_TYPE.BRONZE,
    level: 1,
  },
};
