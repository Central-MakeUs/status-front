import { api } from '@/api/client';
import type {
  UserMainQuestDTO,
  UserSubQuestDTO,
  GetRandomMainQuestByCategoryIdParams,
  GetRandomSubQuestByMainQuestIdParams,
  QuestCreationRequestDTO,
} from '@/api/types/quest';
import type { ApiResponse } from '@/api/types/api';

export const getUserMainQuests = async (
  userId: string
): Promise<UserMainQuestDTO[]> => {
  const response = await api.get<ApiResponse<UserMainQuestDTO[]>>(
    `/users/${userId}/main-quests`
  );
  return response.data ?? [];
};

export const getUserSubQuests = async (
  userId: string,
  mainQuestId: string
): Promise<UserSubQuestDTO[]> => {
  const response = await api.get<ApiResponse<UserSubQuestDTO[]>>(
    `/users/${userId}/main-quests/${mainQuestId}/sub-quests`
  );
  return response.data ?? [];
};

export const getRandomMainQuestByCategoryId = async ({
  categoryId,
  limit = 6,
}: GetRandomMainQuestByCategoryIdParams): Promise<UserMainQuestDTO[]> => {
  const params: Record<string, string> = {
    categoryId: categoryId,
    limit: limit.toString(),
  };

  const response = await api.get<ApiResponse<UserMainQuestDTO[]>>(
    '/main-quests',
    {
      params,
    }
  );
  return response.data ?? [];
};

export const getRandomSubQuestByMainQuestId = async ({
  mainQuestId,
  selectedSubQuestIds = [],
  limit = 6,
}: GetRandomSubQuestByMainQuestIdParams): Promise<UserSubQuestDTO[]> => {
  const params: Record<string, string> = {
    mainQuestId: mainQuestId,
    selectedSubQuestIds: selectedSubQuestIds.join(','),
    limit: limit.toString(),
  };

  const response = await api.get<ApiResponse<UserSubQuestDTO[]>>(
    '/sub-quests',
    {
      params,
    }
  );
  return response.data ?? [];
};

export const postUserQuest = async (data: QuestCreationRequestDTO) => {
  const response = await api.post<ApiResponse<QuestCreationRequestDTO>>(
    `/users/${data.userId}/quest`,
    data
  );
  return response.data ?? {};
};
