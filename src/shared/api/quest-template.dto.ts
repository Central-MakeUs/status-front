import type { AttributeDTO } from './user-quest.dto';
import type { ActionUnitTypeValue } from '../config/quest-template';
import type { SubQuestFrequencyValue } from '../config/quest-template';

export interface ThemeResponseDTO {
  id: number;
  name: string;
}

export interface GetThemesParams {
  attributes?: number[];
}

export interface GetRandomThemesParams {
  attributes?: number[];
  themes?: number[];
}

export interface MainQuestResponseDTO {
  id: number;
  name: string;
}

export interface GetMainQuestsParams {
  attributes: number[];
  theme: number;
}

export interface GetRandomMainQuestsParams {
  attributes: number[];
  theme: number;
  mainQuests: number[];
}

export interface GetRandomSubQuestByMainQuestIdParams {
  mainQuestId: string;
  selectedSubQuestIds?: string[];
  limit: number;
}

export interface RewardResponseDto {
  subQuestRewards: AttributeDTO[];
  mainQuestRewards: AttributeDTO[];
  isMainQuestCompleted: boolean;
}

export interface UsersQuestStatisticsDTO {
  totalMainQuests: number;
  totalSubQuestVerifications: number;
  averageCompletionRate: number;
  averageDurationDays: number;
}

export interface GetSubQuestsParams {
  attributes?: number[];
  mainQuest: number;
}

export interface SubQuestResponseDTO {
  id: number;
  frequencyType: SubQuestFrequencyValue;
  actionUnitType: ActionUnitTypeValue;
  actionUnitNum: number;
  attributes: AttributeDTO[];
  desc: string;
}

export interface RerollSubQuestRequestDTO {
  mainQuest: number;
  attributes: number[];
  selectedSubQuests: number[];
  gottenSubQuests: number[];
}
