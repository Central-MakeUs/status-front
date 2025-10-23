import type { ActionUnitTypeValue } from '@/entities/main-quest/model/types';
import type { AttributeDTO } from '@/entities/users-attribute/api/dto';
import type {
  SubQuestDifficulty,
  SubQuestFrequencyValue,
} from '@/entities/sub-quest/model/types';

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

export interface UsersSubQuestResponseDTO {
  subQuestInfo: SubQuestResponseDTO;
  repeatCnt: number;
  essential: boolean;
  mainQuestId?: number;
}

export interface SubQuestLogDTO {
  id: number;
  difficulty: SubQuestDifficulty;
  memo: string;
}

export interface SubQuestLogsResponseDTO {
  userSubQuest: UsersSubQuestResponseDTO;
  log: SubQuestLogDTO;
}
