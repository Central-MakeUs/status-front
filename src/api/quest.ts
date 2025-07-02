import { api } from '@/api/client';
import type { Quest } from '@/types/quest';

export const getUserQuests = async (userId: string) => {
  const quests = await api.get<Quest[]>(`/users/${userId}/quests`);
  return quests;
};
