import type { AttributeDTO } from '@/entities/users-attribute/api/dto';
import type {
  SubQuestFrequencyValue,
  ActionUnitTypeValue,
} from '../model/types';

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
