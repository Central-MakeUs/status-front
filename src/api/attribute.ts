import { api } from '@/api/client';
import type { AttributeDTO } from '@/api/types/attribute';
import type { ApiResponse } from '@/api/types/api';

export const getUserAbttributes = async (
  userId: string
): Promise<AttributeDTO[]> => {
  const response = await api.get<ApiResponse<AttributeDTO[]>>(
    `/users/${userId}/attributes`
  );
  return response.data ?? [];
};
