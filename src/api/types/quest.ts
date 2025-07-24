import type { Attribute, AttributeReward } from '@/types/attribute';
import type { Category } from '@/types/category';
import type {
  SubQuestFrequencyValue,
  UserMainQuest,
  UserSubQuest,
  SubQuestDifficulty,
} from '@/types/quest';

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

export interface GetRandomMainQuestByCategoryIdParams {
  categoryId: string;
  limit: number;
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
  category: Category;
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
