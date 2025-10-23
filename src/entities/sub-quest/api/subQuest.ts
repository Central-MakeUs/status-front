import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type {
  GetSubQuestsParams,
  RerollSubQuestRequestDTO,
  SubQuestResponseDTO,
} from './dto';

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
