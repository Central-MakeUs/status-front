import type { Attribute, AttributeReward } from '@/types/attribute';
import type { Category } from '@/types/category';
import type {
  SubQuestFrequencyValue,
  UserMainQuest,
  UserSubQuest,
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
