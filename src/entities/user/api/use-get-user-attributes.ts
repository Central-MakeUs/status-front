import { useQuery } from '@tanstack/react-query';
import { getUsersAttributes } from '@/shared/api/user';

export const useGetUsersAttributes = () => {
  return useQuery({
    queryKey: ['attribute'],
    queryFn: () => getUsersAttributes(),
  });
};
