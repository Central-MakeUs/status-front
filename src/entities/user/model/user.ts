import type { BasicUsersDTO } from '../api/user.dto';
import type { TIER_TYPE } from '@/shared/config/tier';
import type { USER_TYPE } from '../config/user';

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export type TierType = (typeof TIER_TYPE)[keyof typeof TIER_TYPE];

export type BasicUsers = BasicUsersDTO;
