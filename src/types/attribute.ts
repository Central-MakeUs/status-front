import type { AttributesReturnDTO } from '@/api/types/attribute';
import { ATTRIBUTE_TYPES } from '@/entities/attribute/config/constants';

export type AttributeType =
  (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];

export type Attribute = AttributesReturnDTO;
