import type { REWARD_STEP, SUB_QUEST_FREQUENCY } from '@/constants/quest';
import type {
  UserMainQuestDTO,
  SubQuestDTO,
  UserSubQuestDTO,
  UserSubQuestLogRequestDTO,
  TodayCompletedQuestDTO,
  UserMainQuestGiveUpRequestDTO,
  ThemeResponseDTO,
  MainQuestResponseDTO,
} from '@/api/types/quest';
export type Theme = ThemeResponseDTO;
export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];

export type MainQuest = MainQuestResponseDTO;
export type UserMainQuest = UserMainQuestDTO;
export type SubQuest = SubQuestDTO;
export type UserSubQuest = UserSubQuestDTO;
export type SubQuestDifficulty = 'easy' | 'default' | 'hard';
export type UserSubQuestLog = UserSubQuestLogRequestDTO;
export type RewardStep = (typeof REWARD_STEP)[keyof typeof REWARD_STEP];
export type TodayCompletedQuest = TodayCompletedQuestDTO;
export type UserMainQuestGiveUp = UserMainQuestGiveUpRequestDTO;
