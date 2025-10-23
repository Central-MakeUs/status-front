import type {
  QuestHistoryByDateDTO,
  SubQuestLogDTO,
  SubQuestLogsResponseDTO,
  UsersSubQuestResponseDTO,
} from '../api/dto';

export type UsersSubQuest = UsersSubQuestResponseDTO;

export type SubQuestLog = SubQuestLogDTO;

export type CompletedQuest = SubQuestLogsResponseDTO;

export type UsersCompletedHistory = QuestHistoryByDateDTO;
