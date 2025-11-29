import type { AttributeDTO } from '@/shared/api/quest-template.dto';
import type { SubQuestResponseDTO } from '@/shared/api/quest-template.dto';
import type { SubQuestInfo } from '../model/create-quest';

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
