import type { BasicUsers } from '@/entities/user/model/user';
import type { OAuthProvider } from '@/features/auth/model/types';
import {
  PROVIDER_TYPE,
  SOCIAL_PROVIDER,
} from '@/features/auth/config/constants';
import { TIER_TYPE, USER_TYPE } from '@/shared/config/user';

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
