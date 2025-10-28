import { api } from '@/shared/api/api-client';
import type { ApiResponse } from '@/shared/api/api-client';
import type {
  CreateQuestRequestDTO,
  CreateQuestResponseDTO,
} from './create-quest.dto';

export const postCreationQuest = async (data: CreateQuestRequestDTO) => {
  const response = await api.post<ApiResponse<CreateQuestResponseDTO>>(
    `/quest/create`,
    data
  );
  return response.data ?? {};
};
