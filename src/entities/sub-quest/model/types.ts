import type { SUB_QUEST_FREQUENCY } from '@/entities/sub-quest/config/constants';
import type {
  SubQuestLogDTO,
  SubQuestResponseDTO,
  UsersSubQuestResponseDTO,
} from '@/entities/sub-quest/api/dto';

export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];

export type SubQuest = SubQuestResponseDTO;

export type SubQuestInfo = Pick<
  SubQuestResponseDTO,
  'id' | 'frequencyType' | 'actionUnitNum'
>;

export type UserSubQuest = UsersSubQuestResponseDTO;

export type SubQuestDifficulty = 'EASY' | 'NORMAL' | 'HARD';

export type SubQuestLog = SubQuestLogDTO;

export interface GetRandomSubQuestByMainQuestIdParams {
  mainQuestId: string;
  selectedSubQuestIds?: string[];
  limit: number;
}
