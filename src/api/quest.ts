import { api } from '@/api/client';
import type {
  UsersSubQuestResponseDTO,
  SubQuestLogDTO,
  QuestHistoryByDateDTO,
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
  RewardResponseDto,
  CreateQuestResponseDTO,
  UserQuestStatisticsDTO,
  WithStatusUsersMainQuestResponseDTO,
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
  const response = await api.post<ApiResponse<CreateQuestResponseDTO>>(
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
): Promise<UsersMainQuestResponseDTO> => {
  const response = await api.get<ApiResponse<UsersMainQuestResponseDTO>>(
    `/quest/${id}`
  );
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

export const getUserSubQuestsAll = async (): Promise<
  UsersSubQuestResponseDTO[]
> => {
  const response =
    await api.get<ApiResponse<UsersSubQuestResponseDTO[]>>(`/quest/today`);
  return response.data ?? [];
};

export const getUserSubQuests = async (
  id: number
): Promise<UsersSubQuestResponseDTO[]> => {
  const response = await api.get<ApiResponse<UsersSubQuestResponseDTO[]>>(
    `/quest/${id}/today`
  );
  return response.data ?? [];
};

export const postUserSubQuestLog = async (
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

export const patchUserSubQuestLog = async (data: SubQuestLogDTO) => {
  const response = await api.patch<ApiResponse<SubQuestLogDTO>>(
    `/quest/sub`,
    data
  );
  return response.data ?? {};
};

export const getUserCompletedHistory = async (
  id: number
): Promise<QuestHistoryByDateDTO[]> => {
  const response = await api.get<ApiResponse<QuestHistoryByDateDTO[]>>(
    `/quest/${id}/history`
  );
  return response.data ?? [];
};

export const deleteUserMainQuest = async (id: number): Promise<void> => {
  await api.delete(`/quest/${id}`);
};

export const getUserStatistic = async (): Promise<UserQuestStatisticsDTO> => {
  const response = await api.get<ApiResponse<UserQuestStatisticsDTO>>(
    `/quest/user-statistics`
  );

  return (
    response.data ?? {
      totalMainQuest: 0,
      totalSubQuestVerification: 0,
      averageCompletionRate: 0,
      averageDurationDays: 0,
    }
  );
};

export const getUserHistory = async (): Promise<
  WithStatusUsersMainQuestResponseDTO[]
> => {
  const response =
    await api.get<ApiResponse<WithStatusUsersMainQuestResponseDTO[]>>(
      `/quest/hisory`
    );

  return response.data ?? [];
};
