import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type {
  ThemeResponseDTO,
  GetThemesParams,
  GetRandomThemesParams,
  MainQuestResponseDTO,
  GetMainQuestsParams,
  GetRandomMainQuestsParams,
  CreateQuestRequestDTO,
  CreateQuestResponseDTO,
  UsersQuestStatisticsDTO,
} from './dto';

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

export const getUsersStatistics =
  async (): Promise<UsersQuestStatisticsDTO> => {
    const response = await api.get<ApiResponse<UsersQuestStatisticsDTO>>(
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
