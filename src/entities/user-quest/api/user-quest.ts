import { api } from '@/shared/api/api-client';
import type { ApiResponse } from '@/shared/api/types';
import type { RewardResponseDto } from '@/shared/api/quest-template.dto';
import type {
  UsersMainQuestResponseDTO,
  WithStatusUsersMainQuestResponseDTO,
  UsersSubQuestResponseDTO,
  SubQuestLogDTO,
  QuestHistoryByDateDTO,
} from './user-quest.dto';

export const getUsersMainQuests = async (): Promise<
  UsersMainQuestResponseDTO[]
> => {
  const response =
    await api.get<ApiResponse<UsersMainQuestResponseDTO[]>>(`/quest/me`);
  return response.data ?? [];
};

export const getUsersMainQuest = async (
  id: number
): Promise<WithStatusUsersMainQuestResponseDTO> => {
  const response = await api.get<
    ApiResponse<WithStatusUsersMainQuestResponseDTO>
  >(`/quest/${id}`);
  return (
    response.data ?? {
      id: 0,
      title: '',
      startDate: '',
      endDate: '',
      attributes: [],
      totalWeeks: 0,
      progress: 0,
      status: 'ACTIVE',
    }
  );
};

export const deleteUsersMainQuest = async (id: number): Promise<void> => {
  await api.delete(`/quest/${id}`);
};

export const getUsersCompletedMainQuests = async (): Promise<
  WithStatusUsersMainQuestResponseDTO[]
> => {
  const response =
    await api.get<ApiResponse<WithStatusUsersMainQuestResponseDTO[]>>(
      `/quest/history`
    );
  return response.data ?? [];
};
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
