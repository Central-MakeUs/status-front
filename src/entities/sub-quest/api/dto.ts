import type { ActionUnitTypeValue } from '@/entities/main-quest/model/types';
import type { AttributeDTO } from '@/entities/users-attribute/api/dto';
import type { SubQuestFrequencyValue } from '../model/types';

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
