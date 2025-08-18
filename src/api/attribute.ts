import { api } from '@/api/client';
import type { AttributesReturnDTO } from '@/api/types/attribute';
import type { ApiResponse } from '@/api/types/api';

export const getUserAbttributes = async (): Promise<AttributesReturnDTO[]> => {
  const response =
    await api.get<ApiResponse<AttributesReturnDTO[]>>('/attribute');
  return response.data || [];
};
