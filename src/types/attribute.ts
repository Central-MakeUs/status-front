import type { AttributeDTO } from '@/api/types/attribute';

export type AttributeType = 'mentality' | 'skill';

export type Attribute = AttributeDTO;

export type AttributeReward = Attribute & {
  exp: number;
};
