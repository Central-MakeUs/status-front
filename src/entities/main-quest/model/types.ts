import type { MAIN_QUEST_STATUS, REWARD_STEP } from '../config/constants';
import type { ThemeResponseDTO, MainQuestResponseDTO } from '../api/dto';

export type Theme = ThemeResponseDTO;

export type MainQuest = MainQuestResponseDTO;

export type RewardStep = (typeof REWARD_STEP)[keyof typeof REWARD_STEP];

export type Status = (typeof MAIN_QUEST_STATUS)[keyof typeof MAIN_QUEST_STATUS];
