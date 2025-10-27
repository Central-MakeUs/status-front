import type { AttributeType } from '../model/attribute';

export interface AttributeDTO {
  id: number;
  name: string;
  exp: number;
}

export interface AttributesReturnDTO {
  attributeId: number;
  name: string;
  type: AttributeType;
  description?: string;
  level: number;
  exp: number;
  expToNextLevel: number;
}
