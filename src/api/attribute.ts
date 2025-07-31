import { api } from '@/api/client';
import type { AttributeReturnDTO } from '@/api/types/attribute';
import type { ApiResponse } from '@/api/types/api';

export const getUserAbttributes = async (): Promise<AttributeReturnDTO[]> => {
  const response =
    await api.get<ApiResponse<AttributeReturnDTO[]>>('/attribute');
  return response.data || [];
};
