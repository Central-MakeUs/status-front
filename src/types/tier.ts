import type { TIER_TYPE } from '@/entities/tier/config/constants';

export type TierType = (typeof TIER_TYPE)[keyof typeof TIER_TYPE];
