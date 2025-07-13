import { api } from '@/api/client';
import type {
  QuestDTO,
  UserMainQuestDTO,
  UserSubQuestDTO,
  GetRandomMainQuestByCategoryIdParams,
  GetRandomSubQuestByMainQuestIdParams,
} from '@/api/types/quest';

export const getUserQuests = async (userId: string): Promise<QuestDTO[]> => {
  const quests = await api.get<QuestDTO[]>(`/users/${userId}/quests`);
  return quests;
};

export const getRandomMainQuestByCategoryId = async ({
  categoryId,
  limit = 6,
}: GetRandomMainQuestByCategoryIdParams): Promise<UserMainQuestDTO[]> => {
  const params: Record<string, string> = {
    categoryId: categoryId,
    limit: limit.toString(),
  };

  const quests = await api.get<UserMainQuestDTO[]>('/main-quests', {
    params,
  });
  return quests;
};

export const getRandomSubQuestByMainQuestId = async ({
  mainQuestId,
  selectedSubQuestIds = [],
  limit = 6,
}: GetRandomSubQuestByMainQuestIdParams): Promise<UserSubQuestDTO[]> => {
  const params: Record<string, string> = {
    mainQuestId: mainQuestId,
    selectedSubQuestIds: selectedSubQuestIds.join(','),
    limit: limit.toString(),
  };

  const quests = await api.get<UserSubQuestDTO[]>('/sub-quests', {
    params,
  });
  return quests;
};
