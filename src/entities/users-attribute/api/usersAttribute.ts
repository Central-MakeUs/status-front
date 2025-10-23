import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { AttributesReturnDTO } from './dto';

export const getUsersAttributes = async (): Promise<AttributesReturnDTO[]> => {
  const response =
    await api.get<ApiResponse<AttributesReturnDTO[]>>('/attribute');
  return response.data || [];
};
