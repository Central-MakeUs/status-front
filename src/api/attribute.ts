import { api } from '@/api/client';
import type { AttributeDTO } from '@/api/types/attribute';

export const getUserAbttributes = async (
  userId: string
): Promise<AttributeDTO[]> => {
  const attributes = await api.get<AttributeDTO[]>(
    `/users/${userId}/attributes`
  );
  return attributes;
};
