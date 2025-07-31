import type { AttributeType } from '@/types/attribute';

export interface AttributeReturnDTO {
  attributeId: number;
  name: string;
  type: AttributeType;
  description?: string;
  level: number;
  exp: number;
}

export interface CreateAttributeDTO {
  name: string;
  type: AttributeType;
  description?: string;
}

export interface UpdateAttributeDTO {
  name?: string;
  description?: string;
  level?: number;
}

// API Parameters Types
export interface GetUserAttributesParams {
  userId: string;
  type?: AttributeType;
}
