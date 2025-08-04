import { api } from '@/api/client';
import type {
  UserMainQuestDTO,
  UserSubQuestDTO,
  QuestCreationRequestDTO,
  UserSubQuestLogRequestDTO,
  TodayCompletedQuestDTO,
  UserCompletedHistoryDTO,
  UserMainQuestGiveUpRequestDTO,
  GetThemesParams,
  GetRandomThemesParams,
  MainQuestResponseDTO,
  GetMainQuestsParams,
  GetRandomMainQuestsParams,
  SubQuestResponseDTO,
  GetSubQuestsParams,
  RerollSubQuestRequestDTO,
} from '@/api/types/quest';
import type { ApiResponse } from '@/api/types/api';
import type { ThemeResponseDTO } from '@/api/types/quest';

export const getThemes = async ({
  attributes = [],
}: GetThemesParams): Promise<ThemeResponseDTO[]> => {
  const params: Record<string, string> = {
    attributes: attributes.join(','),
  };

  const response = await api.get<ApiResponse<ThemeResponseDTO[]>>(
    `/quest/get-themes`,
    {
      params,
    }
  );

  return response.data ?? [];
};

export const getRandomThemes = async ({
  attributes = [],
  themes = [],
}: GetRandomThemesParams): Promise<ThemeResponseDTO[]> => {
  const params: Record<string, string> = {
    attributes: attributes.join(','),
    themes: themes.join(','),
  };

  const response = await api.get<ApiResponse<ThemeResponseDTO[]>>(
    `/quest/reroll-themes`,
    { params }
  );
  return response.data ?? [];
};

export const getMainQuests = async ({
  attributes,
  theme,
}: GetMainQuestsParams): Promise<MainQuestResponseDTO[]> => {
  const params: Record<string, string> = {
    attributes: attributes.join(','),
    theme: theme.toString(),
  };

  const response = await api.get<ApiResponse<MainQuestResponseDTO[]>>(
    '/quest/get-mainquests',
    {
      params,
    }
  );
  return response.data ?? [];
};

export const getRandomMainQuests = async ({
  attributes,
  theme,
  mainQuests,
}: GetRandomMainQuestsParams): Promise<MainQuestResponseDTO[]> => {
  const params: Record<string, string> = {
    attributes: attributes.join(','),
    theme: theme.toString(),
    mainQuests: mainQuests.join(','),
  };

  const response = await api.get<ApiResponse<MainQuestResponseDTO[]>>(
    '/quest/reroll-mainquests',
    {
      params,
    }
  );
  return response.data ?? [];
};

export const getSubQuests = async ({
  attributes = [],
  mainQuest,
}: GetSubQuestsParams): Promise<SubQuestResponseDTO[]> => {
  const params: Record<string, string> = {
    attributes: attributes.join(','),
    mainQuest: mainQuest.toString(),
  };

  const response = await api.get<ApiResponse<SubQuestResponseDTO[]>>(
    '/quest/get-subquests',
    {
      params,
    }
  );
  return response.data ?? [];
};

export const getRandomSubQuests = async (
  data: RerollSubQuestRequestDTO
): Promise<SubQuestResponseDTO[]> => {
  const response = await api.post<ApiResponse<SubQuestResponseDTO[]>>(
    '/quest/reroll-subquests',
    data
  );
  return response.data ?? [];
};

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

export const getTodayCompletedQuests = async (
  userId: string
): Promise<TodayCompletedQuestDTO[]> => {
  const response = await api.get<ApiResponse<TodayCompletedQuestDTO[]>>(
    `/users/${userId}/today-completed-quests`
  );
  return response.data ?? [];
};

export const getUserCompletedHistory = async (
  userId: string
): Promise<UserCompletedHistoryDTO[]> => {
  const response = await api.get<ApiResponse<UserCompletedHistoryDTO[]>>(
    `/users/${userId}/completed-history`
  );
  return response.data ?? [];
};

export const postUserGiveUpMainQuest = async (
  data: UserMainQuestGiveUpRequestDTO
) => {
  const response = await api.post<ApiResponse<UserMainQuestGiveUpRequestDTO>>(
    `/users/${data.userId}/main-quest/${data.mainQuestId}/giveup`,
    data
  );
  return response.data ?? {};
};
