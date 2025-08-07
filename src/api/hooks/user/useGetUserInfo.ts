import { getUserInfo } from '@/api/users';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
  });
};
