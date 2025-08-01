import type { Attribute, AttributeReward } from '@/types/attribute';
import type {
  SubQuestFrequencyValue,
  UserMainQuest,
  UserSubQuest,
  SubQuestDifficulty,
  Theme,
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

export interface MainQuestDTO {
  id: string;
  title: string;
  attributes?: AttributeReward[];
  createdAt?: string;
}

export interface UserMainQuestDTO extends MainQuestDTO {
  startDate: string;
  endDate: string;
  progress?: number;
}

export interface SubQuestDTO {
  id: string;
  desc: string;
  defaultFrequency: SubQuestFrequencyValue;
  defaultRepeat: number;
}

export interface UserSubQuestDTO extends SubQuestDTO {
  frequency: SubQuestFrequencyValue;
  repeatCnt: number;
  attributes: AttributeReward[];
  essential: boolean;
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

export interface QuestCreationRequestDTO {
  userId: string;
  mentalityAttribute: Attribute;
  skillAttribute: Attribute;
  category: Theme;
  mainQuest: UserMainQuest;
  subQuests: UserSubQuest[];
}

export interface UserSubQuestLogRequestDTO {
  userId: string;
  userSubQuestId: string;
  difficulty: SubQuestDifficulty;
}

export interface UserSubQuestLogResponseDTO {
  id: string;
  userId: string;
  userSubQuestId: string;
  difficulty: SubQuestDifficulty;
  status: string;
  createdAt: string;
}

export interface TodayCompletedQuestDTO extends UserSubQuestDTO {
  xp: number;
  difficulty: SubQuestDifficulty;
  comment: string;
}

export interface UserCompletedHistoryDTO {
  date: string;
  quests: TodayCompletedQuestDTO[];
}

export interface UserMainQuestGiveUpRequestDTO {
  userId: string;
  mainQuestId: string;
}
