import type {
  ACTION_UNIT_TYPE_OPTIONS,
  SUB_QUEST_FREQUENCY,
} from '../config/constants';
import type { SubQuestResponseDTO } from '../api/dto';

export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];

export type SubQuest = SubQuestResponseDTO;

export type SubQuestInfo = Pick<
  SubQuestResponseDTO,
  'id' | 'frequencyType' | 'actionUnitNum'
>;

export type SubQuestDifficulty = 'EASY' | 'NORMAL' | 'HARD';

export interface GetRandomSubQuestByMainQuestIdParams {
  mainQuestId: string;
  selectedSubQuestIds?: string[];
  limit: number;
}

export type ActionUnitTypeValue = keyof typeof ACTION_UNIT_TYPE_OPTIONS;
