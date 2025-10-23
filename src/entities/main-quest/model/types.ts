import type {
  ACTION_UNIT_TYPE_OPTIONS,
  MAIN_QUEST_STATUS,
  REWARD_STEP,
} from '../config/constants';
import type {
  ThemeResponseDTO,
  MainQuestResponseDTO,
  CreateQuestResponseDTO,
  CreateQuestRequestDTO,
} from '../api/dto';

export type Theme = ThemeResponseDTO;

export type MainQuest = MainQuestResponseDTO;

export type ActionUnitTypeValue = keyof typeof ACTION_UNIT_TYPE_OPTIONS;

export type CreateQuestRequest = CreateQuestRequestDTO;

export type CreateQuestResponse = CreateQuestResponseDTO;

export type RewardStep = (typeof REWARD_STEP)[keyof typeof REWARD_STEP];

export type Status = (typeof MAIN_QUEST_STATUS)[keyof typeof MAIN_QUEST_STATUS];
