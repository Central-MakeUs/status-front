import type { SubQuestResponseDTO } from '@/entities/sub-quest/api/dto';
import type { SubQuestDifficulty } from '@/entities/sub-quest/model/types';

export interface SubQuestLogDTO {
  id: number;
  difficulty: SubQuestDifficulty;
  memo: string;
}

export interface QuestHistoryByDateDTO {
  date: string;
  logs: SubQuestLogsResponseDTO[];
}

export interface UsersSubQuestResponseDTO {
  subQuestInfo: SubQuestResponseDTO;
  repeatCnt: number;
  essential: boolean;
  mainQuestId?: number;
}

export interface SubQuestLogsResponseDTO {
  userSubQuest: UsersSubQuestResponseDTO;
  log: SubQuestLogDTO;
}
