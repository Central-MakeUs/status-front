import type { SUB_QUEST_FREQUENCY } from '@/constants/quest';
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

export interface UserMainQuest extends MainQuest {
  startDate: string;
  endDate: string;
}

export interface SubQuest {
  id: string;
  desc: string;
  defaultFrequency: SubQuestFrequencyValue;
  defaultRepeat: number;
}

export interface UserSubQuest extends SubQuest {
  frequency: SubQuestFrequencyValue;
  repeatCnt: number;
}

export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];
