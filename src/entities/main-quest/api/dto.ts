import type { AttributeDTO } from '@/entities/users-attribute/api/dto';

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
