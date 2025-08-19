import { getUserHistory } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserHistroy = () => {
  return useQuery({
    queryKey: ['history', 'user'],
    queryFn: () => getUserHistory(),
  });
};
