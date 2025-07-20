export interface AttributeStatus {
  id: number;
  label: string;
  value: number;
  growth: number;
  level: number;
  fullXp: number;
  xpLeft: number;
}

export interface StatusListDTO {
  mentality: AttributeStatus[];
  skill: AttributeStatus[];
}
