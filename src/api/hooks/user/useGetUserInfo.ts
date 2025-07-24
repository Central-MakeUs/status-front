import { getUserInfo } from '@/api/users';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInfo = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserInfo(userId),
  });
};
