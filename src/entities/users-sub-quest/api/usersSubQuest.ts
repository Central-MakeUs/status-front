import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { RewardResponseDto } from '@/entities/main-quest/api/dto';
import type {
  UsersSubQuestResponseDTO,
  SubQuestLogDTO,
  QuestHistoryByDateDTO,
} from './dto';

export const getUsersCompletedHistory = async (
  id: number
): Promise<QuestHistoryByDateDTO[]> => {
  const response = await api.get<ApiResponse<QuestHistoryByDateDTO[]>>(
    `/quest/${id}/history`
  );
  return response.data ?? [];
};

export const getUsersSubQuestsAll = async (): Promise<
  UsersSubQuestResponseDTO[]
> => {
  const response =
    await api.get<ApiResponse<UsersSubQuestResponseDTO[]>>(`/quest/today`);
  return response.data ?? [];
};

export const getUsersSubQuests = async (
  id: number
): Promise<UsersSubQuestResponseDTO[]> => {
  const response = await api.get<ApiResponse<UsersSubQuestResponseDTO[]>>(
    `/quest/${id}/today`
  );
  return response.data ?? [];
};

export const postUsersSubQuestLog = async (
  data: SubQuestLogDTO
): Promise<RewardResponseDto> => {
  const response = await api.post<ApiResponse<RewardResponseDto>>(
    `/quest/sub`,
    data
  );

  return (
    response.data ?? {
      subQuestRewards: [],
      mainQuestRewards: [],
      isMainQuestCompleted: false,
    }
  );
};

export const patchUsersSubQuestLog = async (data: SubQuestLogDTO) => {
  const response = await api.patch<ApiResponse<SubQuestLogDTO>>(
    `/quest/sub`,
    data
  );
  return response.data ?? {};
};
