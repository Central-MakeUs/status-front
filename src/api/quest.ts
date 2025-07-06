import { api } from '@/api/client';
import type { MainQuest, Quest } from '@/types/quest';

export type GetRandomMainQuestByCategoryIdParams = {
  categoryId: string;
  limit: number;
};

export const getUserQuests = async (userId: string) => {
  const quests = await api.get<Quest[]>(`/users/${userId}/quests`);
  return quests;
};

export const getRandomMainQuestByCategoryId = async ({
  categoryId,
  limit = 6,
}: GetRandomMainQuestByCategoryIdParams) => {
  const params: Record<string, string> = {
    limit: limit.toString(),
  };

  const quest = await api.get<MainQuest[]>(`/quests/${categoryId}`, {
    params,
  });
  return quest;
};
