import { getStatusList } from '@/api/status';
import { useQuery } from '@tanstack/react-query';

export const useGetStatusList = (userId: string) => {
  return useQuery({
    queryKey: ['statusList', 'user', userId],
    queryFn: () => getStatusList(userId),
  });
};
