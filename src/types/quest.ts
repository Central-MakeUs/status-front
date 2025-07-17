import type { SUB_QUEST_FREQUENCY } from '@/constants/quest';
import type {
  MainQuestDTO,
  UserMainQuestDTO,
  SubQuestDTO,
  UserSubQuestDTO,
} from '@/api/types/quest';

export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];

export type MainQuest = MainQuestDTO;
export type UserMainQuest = UserMainQuestDTO;
export type SubQuest = SubQuestDTO;
export type UserSubQuest = UserSubQuestDTO;
