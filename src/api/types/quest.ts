import type { Attribute } from '@/types/attribute';
import type { StatReward, SubQuestFrequencyValue } from '@/types/quest';

export interface QuestDTO {
  id: string;
  title: string;
  expiredAt: string;
  progress: number;
  totalDays: number;
  rewards: StatReward[];
}

export interface MainQuestDTO {
  id: string;
  title: string;
  attributes?: Attribute[];
  createdAt?: string;
}

export interface UserMainQuestDTO extends MainQuestDTO {
  startDate: string;
  endDate: string;
}

export interface SubQuestDTO {
  id: string;
  desc: string;
  defaultFrequency: SubQuestFrequencyValue;
  defaultRepeat: number;
}

export interface UserSubQuestDTO extends SubQuestDTO {
  frequency: SubQuestFrequencyValue;
  repeatCnt: number;
}

export interface GetRandomMainQuestByCategoryIdParams {
  categoryId: string;
  limit: number;
}

export interface GetRandomSubQuestByMainQuestIdParams {
  mainQuestId: string;
  selectedSubQuestIds?: string[];
  limit: number;
}
