import type { REWARD_STEP, SUB_QUEST_FREQUENCY } from '@/constants/quest';
import type {
  UserSubQuestDTO,
  UserSubQuestLogRequestDTO,
  CompletedQuestDTO,
  UserMainQuestGiveUpRequestDTO,
  ThemeResponseDTO,
  MainQuestResponseDTO,
  SubQuestResponseDTO,
  UserCompletedHistoryDTO,
  UsersMainQuestResponseDTO,
} from '@/api/types/quest';
export type Theme = ThemeResponseDTO;
export type MainQuest = MainQuestResponseDTO;
export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];
export type SubQuest = SubQuestResponseDTO;
export type SubQuestInfo = Pick<
  SubQuestResponseDTO,
  'id' | 'frequencyType' | 'actionUnitNum'
>;
export type UsersMainQuest = UsersMainQuestResponseDTO;
export type UserSubQuest = UserSubQuestDTO;
export type SubQuestDifficulty = 'easy' | 'default' | 'hard';
export type UserSubQuestLog = UserSubQuestLogRequestDTO;
export type RewardStep = (typeof REWARD_STEP)[keyof typeof REWARD_STEP];
export type CompletedQuest = CompletedQuestDTO;
export type UserMainQuestGiveUp = UserMainQuestGiveUpRequestDTO;
export type UserCompletedHistory = UserCompletedHistoryDTO;
