import type { SUB_QUEST_FREQUENCY } from '@/constants/quest';
import type {
  QuestDTO,
  MainQuestDTO,
  UserMainQuestDTO,
  SubQuestDTO,
  UserSubQuestDTO,
} from '@/api/types/quest';

export type StatType = 'patience';

export interface StatReward {
  statType: StatType;
  exp: number;
}

export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];

export type Quest = QuestDTO;
export type MainQuest = MainQuestDTO;
export type UserMainQuest = UserMainQuestDTO;
export type SubQuest = SubQuestDTO;
export type UserSubQuest = UserSubQuestDTO;
