import { api } from '@/shared/api/api-client';
import type { ApiResponse } from '@/shared/api/types';
import type { SubQuestResponseDTO } from '@/shared/api/quest-template.dto';
import type {
  CreateQuestRequestDTO,
  CreateQuestResponseDTO,
  RerollSubQuestRequestDTO,
} from './dto';

export const postCreationQuest = async (data: CreateQuestRequestDTO) => {
  const response = await api.post<ApiResponse<CreateQuestResponseDTO>>(
    `/quest/create`,
    data
  );
  return response.data ?? {};
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
