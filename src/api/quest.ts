import { api } from '@/api/client';
import type { Quest, UserMainQuest, UserSubQuest } from '@/types/quest';

export type GetRandomMainQuestByCategoryIdParams = {
  categoryId: string;
  limit: number;
};

export type GetRandomSubQuestByMainQuestIdParams = {
  mainQuestId: string;
  selectedSubQuestIds?: string[];
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
    categoryId: categoryId,
    limit: limit.toString(),
  };

  const quest = await api.get<UserMainQuest[]>('/main-quests', {
    params,
  });
  return quest;
};

export const getRandomSubQuestByMainQuestId = async ({
  mainQuestId,
  selectedSubQuestIds = [],
  limit = 6,
}: GetRandomSubQuestByMainQuestIdParams) => {
  const params: Record<string, string> = {
    mainQuestId: mainQuestId,
    selectedSubQuestIds: selectedSubQuestIds.join(','),
    limit: limit.toString(),
  };

  const quest = await api.get<UserSubQuest[]>('/sub-quests', {
    params,
  });
  return quest;
};
