import { getUserAbttributes } from '@/api/attribute';
import { useQuery } from '@tanstack/react-query';

export const useGetUserAttributes = () => {
  return useQuery({
    queryKey: ['attribute'],
    queryFn: () => getUserAbttributes(),
  });
};
