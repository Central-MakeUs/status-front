import { getUserAbttributes } from '@/api/attribute';
import { useQuery } from '@tanstack/react-query';

export const useGetUserAttribute = (userId: string) => {
  return useQuery({
    queryKey: ['attributes', 'user', userId],
    queryFn: () => getUserAbttributes(userId),
  });
};
