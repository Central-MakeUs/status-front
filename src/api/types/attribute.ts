import type { AttributeType } from '@/types/attribute';

export interface AttributesReturnDTO {
  attributeId: number;
  name: string;
  type: AttributeType;
  description?: string;
  level: number;
  exp: number;
  expToNextLevel: number;
}

export interface AttributeDTO {
  id: number;
  name: string;
  exp: number;
}
