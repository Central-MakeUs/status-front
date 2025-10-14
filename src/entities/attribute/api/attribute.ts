import { api } from '@/shared/api/client';
import type { AttributesReturnDTO } from '@/entities/attribute/api/dto';
import type { ApiResponse } from '@/shared/api/types';

export const getUserAbttributes = async (): Promise<AttributesReturnDTO[]> => {
  const response =
    await api.get<ApiResponse<AttributesReturnDTO[]>>('/attribute');
  return response.data || [];
};
