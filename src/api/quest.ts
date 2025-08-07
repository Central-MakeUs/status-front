import { api } from '@/api/client';
import type {
  UserMainQuestDTO,
  UserSubQuestDTO,
  UserSubQuestLogRequestDTO,
  CompletedQuestDTO,
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
  CreateQuestRequestDTO,
  UsersMainQuestResponseDTO,
  RewardResponseDTO,
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

export const postCreationQuest = async (data: CreateQuestRequestDTO) => {
  const response = await api.post<ApiResponse<CreateQuestRequestDTO>>(
    `/quest/create`,
    data
  );
  return response.data ?? {};
};

export const getUsersMainQuests = async (): Promise<
  UsersMainQuestResponseDTO[]
> => {
  const response =
    await api.get<ApiResponse<UsersMainQuestResponseDTO[]>>(`/quest/me`);
  return response.data ?? [];
};

export const getUserMainQuest = async (
  id: number
): Promise<UserMainQuestDTO> => {
  const response = await api.get<ApiResponse<UserMainQuestDTO>>(`/quest/${id}`);
  return (
    response.data ?? {
      id: 0,
      title: '',
      startDate: '',
      endDate: '',
      attributes: [],
      totalWeeks: 0,
      progress: 0,
    }
  );
};

export const getUserSubQuestsAll = async (): Promise<UserSubQuestDTO[]> => {
  const response =
    await api.get<ApiResponse<UserSubQuestDTO[]>>(`/quest/today`);
  return response.data ?? [];
};

export const getUserSubQuests = async (
  id: number
): Promise<UserSubQuestDTO[]> => {
  const response = await api.get<ApiResponse<UserSubQuestDTO[]>>(
    `/quest/${id}/today`
  );
  return response.data ?? [];
};

/**
 * [TODO] 퀘스트 인증 시 서브 퀘스트 인증 상태 patch, 서브 퀘스트 로그 post 트랜잭션 처리 필요. 서버에서 처리가 최적
 * @param data - API 구현에 따라 파라미터 타입 변경 필요
 */
export const postUserSubQuestLog = async (
  data: UserSubQuestLogRequestDTO
): Promise<RewardResponseDTO> => {
  const response = await api.post<ApiResponse<RewardResponseDTO>>(
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

export const patchUserSubQuestLog = async (data: UserSubQuestLogRequestDTO) => {
  const response = await api.patch<ApiResponse<UserSubQuestLogRequestDTO>>(
    `/quest/sub`,
    data
  );
  return response.data ?? {};
};

export const getTodayCompletedQuests = async (
  userId: string
): Promise<CompletedQuestDTO[]> => {
  const response = await api.get<ApiResponse<CompletedQuestDTO[]>>(
    `/users/${userId}/today-completed-quests`
  );
  return response.data ?? [];
};

export const getUserCompletedHistory = async (
  id: number
): Promise<UserCompletedHistoryDTO[]> => {
  const response = await api.get<ApiResponse<UserCompletedHistoryDTO[]>>(
    `/quest/${id}/history`
  );
  return response.data ?? [];
};

export const postUserGiveUpMainQuest = async (
  data: UserMainQuestGiveUpRequestDTO
) => {
  const response = await api.delete<ApiResponse<UserMainQuestGiveUpRequestDTO>>(
    `/quest/${data.id}`
  );
  return response.data ?? {};
};
