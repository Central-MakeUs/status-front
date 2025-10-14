import type {
  ACTION_UNIT_TYPE_OPTIONS,
  MAIN_QUEST_STATUS,
  REWARD_STEP,
  SUB_QUEST_FREQUENCY,
} from '@/entities/quest/config/constants';
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
  WithStatusUsersMainQuestResponseDTO,
} from '@/entities/quest/api/dto';
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
export type Status = (typeof MAIN_QUEST_STATUS)[keyof typeof MAIN_QUEST_STATUS];
export type UserCompletedMainQuests = WithStatusUsersMainQuestResponseDTO;
