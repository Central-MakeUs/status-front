import type { BasicUsersDTO } from '../api/dto';
import type { TIER_TYPE, USER_TYPE } from '../config/constants';

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export type TierType = (typeof TIER_TYPE)[keyof typeof TIER_TYPE];

export type BasicUsers = BasicUsersDTO;
