import type {
  ACTION_UNIT_TYPE_OPTIONS,
  MAIN_QUEST_STATUS,
  REWARD_STEP,
} from '@/entities/main-quest/config/constants';
import type {
  ThemeResponseDTO,
  MainQuestResponseDTO,
  QuestHistoryByDateDTO,
  UsersMainQuestResponseDTO,
  CreateQuestResponseDTO,
  CreateQuestRequestDTO,
  WithStatusUsersMainQuestResponseDTO,
} from '@/entities/main-quest/api/dto';
import type { SubQuestLogsResponseDTO } from '@/entities/sub-quest/api/dto';

export type Theme = ThemeResponseDTO;

export type MainQuest = MainQuestResponseDTO;

export type ActionUnitTypeValue = keyof typeof ACTION_UNIT_TYPE_OPTIONS;

export type CreateQuestRequest = CreateQuestRequestDTO;

export type CreateQuestResponse = CreateQuestResponseDTO;

export type UsersMainQuest = UsersMainQuestResponseDTO;

export type RewardStep = (typeof REWARD_STEP)[keyof typeof REWARD_STEP];

export type CompletedQuest = SubQuestLogsResponseDTO;

export type UserCompletedHistory = QuestHistoryByDateDTO;

export type Status = (typeof MAIN_QUEST_STATUS)[keyof typeof MAIN_QUEST_STATUS];

export type UserCompletedMainQuests = WithStatusUsersMainQuestResponseDTO;
