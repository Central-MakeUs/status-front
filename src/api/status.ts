import { api } from '@/api/client';
import type { StatusListDTO } from '@/api/types/status';
import type { ApiResponse } from '@/api/types/api';

export const getStatusList = async (userId: string): Promise<StatusListDTO> => {
  const response = await api.get<ApiResponse<StatusListDTO>>(
    `/users/${userId}/statusList`
  );
  return (
    response.data ?? {
      mentality: [],
      skill: [],
    }
  );
};
