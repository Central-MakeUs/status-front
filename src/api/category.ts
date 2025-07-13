import { api } from '@/api/client';
import type {
  CategoryDTO,
  GetRandomCategoriesByAttributesParams,
} from '@/api/types/category';

export const getRandomCategoriesByAttributes = async ({
  attributeIds = [],
  limit = 6,
}: GetRandomCategoriesByAttributesParams): Promise<CategoryDTO[]> => {
  const params: Record<string, string> = {
    attributeIds: attributeIds.join(','),
    limit: limit.toString(),
  };

  return await api.get<CategoryDTO[]>(`/categories`, { params });
};
