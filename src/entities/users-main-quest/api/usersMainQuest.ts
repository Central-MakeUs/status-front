import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type {
  UsersMainQuestResponseDTO,
  WithStatusUsersMainQuestResponseDTO,
} from './dto';

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
