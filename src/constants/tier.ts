import IconBronze from '@/assets/icons/tiers/icon_bronze.svg?react';
import IconSilver from '@/assets/icons/tiers/icon_silver.svg?react';
import IconGold from '@/assets/icons/tiers/icon_gold.svg?react';
import IconPlatinum from '@/assets/icons/tiers/icon_platinum.svg?react';
import IconDia from '@/assets/icons/tiers/icon_dia.svg?react';

export const TIER_ICONS = {
  BRONZE: IconBronze,
  SILVER: IconSilver,
  GOLD: IconGold,
  PLATINUM: IconPlatinum,
  DIA: IconDia,
} as const;

export const TIER_TYPE = {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIA: 'DIA',
} as const;
