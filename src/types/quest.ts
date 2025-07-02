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
