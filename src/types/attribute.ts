export type AttributeType = 'mentality' | 'skill';

export interface Attribute {
  attributeId: number;
  name: string;
  type: AttributeType;
  description?: string;
  level: number;
}
