import type {
  SubQuestFrequencyValue,
  SubQuestDifficulty,
  SubQuestInfo,
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
  actionUnitType: string;
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

export interface MainQuestDTO {
  id: number;
  title: string;
  attributes?: AttributeDTO[];
  createdAt?: string;
}

export interface UserMainQuestDTO extends MainQuestDTO {
  startDate: string;
  endDate: string;
  totalWeeks: number;
  progress?: number;
}

export interface SubQuestDTO {
  id: number;
  frequencyType: SubQuestFrequencyValue;
  actionUnitType: string;
  actionUnitNum: number;
  attributes: AttributeDTO[];
  desc: string;
}

export interface UserSubQuestDTO {
  subQuestInfo: SubQuestDTO;
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

export interface UserSubQuestLogRequestDTO {
  id: number;
  difficulty: SubQuestDifficulty;
  memo: string;
}

export interface Rewards {
  id: number;
  name: string;
  exp: number;
}
export interface RewardResponseDTO {
  subQuestRewards: Rewards[];
  mainQuestRewards: Rewards[];
  isMainQuestCompleted: boolean;
}

export interface CompletedQuestDTO extends UserSubQuestDTO {
  log: {
    id: number;
    difficulty: SubQuestDifficulty;
    memo: string;
  };
}

export interface UserCompletedHistoryDTO {
  date: string;
  logs: CompletedQuestDTO[];
}

export interface UserMainQuestGiveUpRequestDTO {
  id: number;
}
