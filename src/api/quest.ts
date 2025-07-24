import { api } from '@/api/client';
import type {
  UserMainQuestDTO,
  UserSubQuestDTO,
  GetRandomMainQuestByCategoryIdParams,
  GetRandomSubQuestByMainQuestIdParams,
  QuestCreationRequestDTO,
  UserSubQuestLogRequestDTO,
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

export const getUserMainQuest = async (
  userId: string,
  mainQuestId: string
): Promise<UserMainQuestDTO> => {
  const response = await api.get<ApiResponse<UserMainQuestDTO>>(
    `/users/${userId}/main-quest/${mainQuestId}`
  );
  return (
    response.data ?? {
      id: '',
      title: '',
      startDate: '',
      endDate: '',
      attributes: [],
      createdAt: '',
    }
  );
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

/**
 * [TODO] 퀘스트 인증 시 서브 퀘스트 인증 상태 patch, 서브 퀘스트 로그 post 트랜잭션 처리 필요. 서버에서 처리가 최적
 * @param data - API 구현에 따라 파라미터 타입 변경 필요
 */
export const postUserSubQuestLog = async (data: UserSubQuestLogRequestDTO) => {
  const response = await api.post<ApiResponse<UserSubQuestLogRequestDTO>>(
    `/users/${data.userId}/sub-quest-log`,
    data
  );
  return response.data ?? {};
};
