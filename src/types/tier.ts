import type { TIER_TYPE } from '@/constants/tier';

export type TierType = (typeof TIER_TYPE)[keyof typeof TIER_TYPE];
