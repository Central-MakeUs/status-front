import { api } from '@/api/client';
import type { Category } from '@/types/category';

export interface GetRandomCategoriesByAttributesParams {
  attributeIds?: number[];
  limit?: number;
}

export const getRandomCategoriesByAttributes = async ({
  attributeIds = [],
  limit = 6,
}: GetRandomCategoriesByAttributesParams) => {
  const params: Record<string, string> = {
    attributeIds: attributeIds.join(','),
    limit: limit.toString(),
  };

  return await api.get<Category[]>(`/categories`, { params });
};
