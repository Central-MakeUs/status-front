import type { BasicUsersDTO } from '@/shared/api/user.dto';
import type { TIER_TYPE, USER_TYPE } from '@/shared/config/user';

export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export type TierType = (typeof TIER_TYPE)[keyof typeof TIER_TYPE];

export type BasicUsers = BasicUsersDTO;
