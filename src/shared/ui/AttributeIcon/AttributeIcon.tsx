import { ATTRIBUTE_ICONS } from '@/shared/config/attribute';

interface AttributeIconProps {
  id: number;
  className?: string;
  size?: number;
}
export const AttributeIcon = ({
  id,
  className,
  size = 24,
}: AttributeIconProps) => {
  const IconComponent = ATTRIBUTE_ICONS[id as keyof typeof ATTRIBUTE_ICONS];

  return <IconComponent className={className} width={size} height={size} />;
};
