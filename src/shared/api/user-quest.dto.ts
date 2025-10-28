import type { Status } from '@/entities/quest-template/model/quest-template';
import type { AttributeDTO } from '@/shared/api/attribute.dto';
import type { SubQuestResponseDTO } from '@/shared/api/quest-template.dto';
import type { SubQuestDifficulty } from '@/entities/quest-template/model/quest-template';

export interface UsersMainQuestResponseDTO {
  id: number;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  title: string;
  attributes: AttributeDTO[];
  progress: number;
}

export interface WithStatusUsersMainQuestResponseDTO
  extends UsersMainQuestResponseDTO {
  status: Status;
}
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
