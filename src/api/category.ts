import { api } from '@/api/client';
import type {
  CategoryDTO,
  GetRandomCategoriesByAttributesParams,
} from '@/api/types/category';
import type { ApiResponse } from '@/api/types/api';

export const getRandomCategoriesByAttributes = async ({
  attributeIds = [],
  limit = 6,
}: GetRandomCategoriesByAttributesParams): Promise<CategoryDTO[]> => {
  const params: Record<string, string> = {
    attributeIds: attributeIds.join(','),
    limit: limit.toString(),
  };

  const response = await api.get<ApiResponse<CategoryDTO[]>>(`/categories`, {
    params,
  });
  return response.data ?? [];
};
