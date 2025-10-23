import { api } from '@/shared/api/client';
import type {
  QuestHistoryByDateDTO,
  GetThemesParams,
  GetRandomThemesParams,
  MainQuestResponseDTO,
  GetMainQuestsParams,
  GetRandomMainQuestsParams,
  CreateQuestRequestDTO,
  UsersMainQuestResponseDTO,
  CreateQuestResponseDTO,
  UserQuestStatisticsDTO,
  WithStatusUsersMainQuestResponseDTO,
} from '@/entities/main-quest/api/dto';
import type { ApiResponse } from '@/shared/api/types';
import type { ThemeResponseDTO } from '@/entities/main-quest/api/dto';

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
      totalMainQuests: 0,
      totalSubQuestVerifications: 0,
      averageCompletionRate: 0,
      averageDurationDays: 0,
    }
  );
};

export const getUserCompletedMainQuests = async (): Promise<
  WithStatusUsersMainQuestResponseDTO[]
> => {
  const response =
    await api.get<ApiResponse<WithStatusUsersMainQuestResponseDTO[]>>(
      `/quest/history`
    );
  return response.data ?? [];
};
