import { TIER_ICONS } from '../../config/user';

interface TierIconProps {
  id: string;
  className?: string;
  size?: number;
}

export const TierIcon = ({ id, className }: TierIconProps) => {
  const IconComponent = TIER_ICONS[id as keyof typeof TIER_ICONS];

  return <IconComponent className={className} />;
};
