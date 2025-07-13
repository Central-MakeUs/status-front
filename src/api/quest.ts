import { api } from '@/api/client';
import type {
  QuestDTO,
  UserMainQuestDTO,
  UserSubQuestDTO,
  GetRandomMainQuestByCategoryIdParams,
  GetRandomSubQuestByMainQuestIdParams,
} from '@/api/types/quest';
import type { ApiResponse } from '@/api/types/api';

export const getUserQuests = async (userId: string): Promise<QuestDTO[]> => {
  const response = await api.get<ApiResponse<QuestDTO[]>>(
    `/users/${userId}/quests`
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
