import { ATTRIBUTE_TYPES } from '../config/attribute';
import type { AttributesReturnDTO } from '../api/attribute.dto';

export type AttributeType =
  (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];

export type Attribute = AttributesReturnDTO;
