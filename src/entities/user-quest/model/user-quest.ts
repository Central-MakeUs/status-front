import type {
  UsersMainQuestResponseDTO,
  WithStatusUsersMainQuestResponseDTO,
  QuestHistoryByDateDTO,
  SubQuestLogDTO,
  SubQuestLogsResponseDTO,
  UsersSubQuestResponseDTO,
} from '../api/user-quest.dto';

export type UsersMainQuest = UsersMainQuestResponseDTO;

export type UserCompletedMainQuests = WithStatusUsersMainQuestResponseDTO;

export type UsersSubQuest = UsersSubQuestResponseDTO;

export type SubQuestLog = SubQuestLogDTO;

export type CompletedQuest = SubQuestLogsResponseDTO;

export type UsersCompletedHistory = QuestHistoryByDateDTO;
