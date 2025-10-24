import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { SubQuestResponseDTO, GetSubQuestsParams } from './dto';

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
