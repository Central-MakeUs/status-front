import type { Attribute } from '@/types/attribute';

export type StatType = 'patience';

export interface StatReward {
  statType: StatType;
  exp: number;
}

export interface Quest {
  id: string;
  title: string;
  expiredAt: string;
  progress: number;
  totalDays: number;
  rewards: StatReward[];
}

export interface MainQuest {
  id: string;
  title: string;
  attributes?: Attribute[];
  createdAt?: string;
}
