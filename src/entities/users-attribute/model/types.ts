import type { AttributesReturnDTO } from '@/entities/users-attribute/api/dto';
import { ATTRIBUTE_TYPES } from '@/entities/users-attribute/config/constants';

export type AttributeType =
  (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];

export type Attribute = AttributesReturnDTO;
