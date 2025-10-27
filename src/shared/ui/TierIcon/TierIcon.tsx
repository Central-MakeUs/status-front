import { TIER_ICONS } from '@/shared/config/tier';

interface TierIconProps {
  id: string;
  className?: string;
  size?: number;
}

export const TierIcon = ({ id, className, size = 24 }: TierIconProps) => {
  const IconComponent = TIER_ICONS[id as keyof typeof TIER_ICONS];

  return <IconComponent className={className} width={size} height={size} />;
};
