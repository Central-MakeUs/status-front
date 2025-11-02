import IconAttribute101 from '@/assets/icons/attribute/icon-attribute101.svg?react';
import IconAttribute102 from '@/assets/icons/attribute/icon-attribute102.svg?react';
import IconAttribute103 from '@/assets/icons/attribute/icon-attribute103.svg?react';
import IconAttribute104 from '@/assets/icons/attribute/icon-attribute104.svg?react';
import IconAttribute105 from '@/assets/icons/attribute/icon-attribute105.svg?react';
import IconAttribute106 from '@/assets/icons/attribute/icon-attribute106.svg?react';
import IconAttribute201 from '@/assets/icons/attribute/icon-attribute201.svg?react';
import IconAttribute202 from '@/assets/icons/attribute/icon-attribute202.svg?react';
import IconAttribute203 from '@/assets/icons/attribute/icon-attribute203.svg?react';
import IconAttribute204 from '@/assets/icons/attribute/icon-attribute204.svg?react';
import IconAttribute205 from '@/assets/icons/attribute/icon-attribute205.svg?react';
import IconAttribute206 from '@/assets/icons/attribute/icon-attribute206.svg?react';

export const ATTRIBUTE_ICONS = {
  101: IconAttribute101,
  102: IconAttribute102,
  103: IconAttribute103,
  104: IconAttribute104,
  105: IconAttribute105,
  106: IconAttribute106,
  201: IconAttribute201,
  202: IconAttribute202,
  203: IconAttribute203,
  204: IconAttribute204,
  205: IconAttribute205,
  206: IconAttribute206,
} as const;

export const ATTRIBUTE_TYPES = {
  MENTALITY: 'MENTALITY',
  SKILL: 'SKILL',
} as const;

export type AttributeType =
  (typeof ATTRIBUTE_TYPES)[keyof typeof ATTRIBUTE_TYPES];
