import type { AttributeDTO } from '@/entities/users-attribute/api/dto';
import type { SubQuestResponseDTO } from '@/entities/sub-quest/api/dto';
import type { SubQuestInfo } from '@/entities/sub-quest/model/types';

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

export interface RerollSubQuestRequestDTO {
  mainQuest: number;
  attributes: number[];
  selectedSubQuests: number[];
  gottenSubQuests: number[];
}
