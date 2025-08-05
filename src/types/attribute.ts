import type { AttributeReturnDTO } from '@/api/types/attribute';
import { ATTRIBUTE_TYPES } from '@/constants/attribute';

export type AttributeType =
  (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];

export type Attribute = AttributeReturnDTO;
