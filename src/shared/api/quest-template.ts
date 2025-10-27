import { api } from '@/shared/api/api-client';
import type { ApiResponse } from '@/shared/api/api-client';
import type {
  ThemeResponseDTO,
  GetThemesParams,
  GetRandomThemesParams,
  MainQuestResponseDTO,
  GetMainQuestsParams,
  GetRandomMainQuestsParams,
  UsersQuestStatisticsDTO,
  SubQuestResponseDTO,
  GetSubQuestsParams,
} from './quest-template.dto';

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
