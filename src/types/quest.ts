import type {
  ACTION_UNIT_TYPE_OPTIONS,
  REWARD_STEP,
  SUB_QUEST_FREQUENCY,
} from '@/constants/quest';
import type {
  UsersSubQuestResponseDTO,
  SubQuestLogDTO,
  SubQuestLogsResponseDTO,
  ThemeResponseDTO,
  MainQuestResponseDTO,
  SubQuestResponseDTO,
  QuestHistoryByDateDTO,
  UsersMainQuestResponseDTO,
  CreateQuestResponseDTO,
  CreateQuestRequestDTO,
} from '@/api/types/quest';
export type Theme = ThemeResponseDTO;
export type MainQuest = MainQuestResponseDTO;
export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];
export type ActionUnitTypeValue = keyof typeof ACTION_UNIT_TYPE_OPTIONS;
export type SubQuest = SubQuestResponseDTO;
export type SubQuestInfo = Pick<
  SubQuestResponseDTO,
  'id' | 'frequencyType' | 'actionUnitNum'
>;
export type CreateQuestRequest = CreateQuestRequestDTO;
export type CreateQuestResponse = CreateQuestResponseDTO;
export type UsersMainQuest = UsersMainQuestResponseDTO;
export type UserSubQuest = UsersSubQuestResponseDTO;
export type SubQuestDifficulty = 'EASY' | 'NORMAL' | 'HARD';
export type SubQuestLog = SubQuestLogDTO;
export type RewardStep = (typeof REWARD_STEP)[keyof typeof REWARD_STEP];
export type CompletedQuest = SubQuestLogsResponseDTO;
export type UserCompletedHistory = QuestHistoryByDateDTO;
export type Status =
  | 'ACTIVE'
  | 'FAILED'
  | 'DELETED'
  | 'WEEKLY_ACCOMPLISHED'
  | 'COMPLETED'
  | 'ACCOMPLISHED';
