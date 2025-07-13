import { useQuery } from '@tanstack/react-query';
import { getRandomCategoriesByAttributes } from '@/api/category';
import type { GetRandomCategoriesByAttributesParams } from '@/api/types/category';

export const useGetRandomCategoriesByAttributes = ({
  attributeIds,
  limit,
}: GetRandomCategoriesByAttributesParams) => {
  return useQuery({
    queryKey: ['categories', 'attributes', attributeIds],
    queryFn: () => getRandomCategoriesByAttributes({ attributeIds, limit }),
  });
};
