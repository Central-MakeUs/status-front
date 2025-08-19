import type {
  SubQuestFrequencyValue,
  SubQuestDifficulty,
  SubQuestInfo,
  ActionUnitTypeValue,
  Status,
} from '@/types/quest';
import type { AttributeDTO } from './attribute';

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

export interface SubQuestResponseDTO {
  id: number;
  frequencyType: SubQuestFrequencyValue;
  actionUnitType: ActionUnitTypeValue;
  actionUnitNum: number;
  attributes: AttributeDTO[];
  desc: string;
}

export interface GetSubQuestsParams {
  attributes?: number[];
  mainQuest: number;
}

export interface RerollSubQuestRequestDTO {
  mainQuest: number;
  attributes: number[];
  selectedSubQuests: number[];
  gottenSubQuests: number[];
}

export interface CreateQuestRequestDTO {
  theme: number;
  mainQuest: number;
  startDate: string;
  endDate: string;
  subQuests: SubQuestInfo[];
}

export interface CreateQuestResponseDTO {
  id: number;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  title: string;
  attributes: AttributeDTO[];
  subQuests: SubQuestResponseDTO[];
  npcName: string;
}

export interface UsersMainQuestResponseDTO {
  id: number;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  title: string;
  attributes: AttributeDTO[];
  progress: number;
}
export interface UsersSubQuestResponseDTO {
  subQuestInfo: SubQuestResponseDTO;
  repeatCnt: number;
  essential: boolean;
  mainQuestId?: number;
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

export interface SubQuestLogDTO {
  id: number;
  difficulty: SubQuestDifficulty;
  memo: string;
}

export interface RewardResponseDto {
  subQuestRewards: AttributeDTO[];
  mainQuestRewards: AttributeDTO[];
  isMainQuestCompleted: boolean;
}

export interface SubQuestLogsResponseDTO {
  userSubQuest: UsersSubQuestResponseDTO;
  log: SubQuestLogDTO;
}

export interface QuestHistoryByDateDTO {
  date: string;
  logs: SubQuestLogsResponseDTO[];
}

export interface UserQuestStatisticsDTO {
  totalMainQuest: number;
  totalSubQuestVerification: number;
  averageCompletionRate: number;
  averageDurationDays: number;
}

export interface WithStatusUsersMainQuestResponseDTO
  extends UsersMainQuestResponseDTO {
  status: Status;
}
