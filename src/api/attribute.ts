import { api } from '@/api/client';
import type { Attribute } from '@/types/attribute';

export const getUserAbttributes = async (userId: string) => {
  const quests = await api.get<Attribute[]>(`/users/${userId}/attributes`);
  return quests;
};
