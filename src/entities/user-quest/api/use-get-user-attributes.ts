import { useQuery } from '@tanstack/react-query';
import { getUsersAttributes } from '@/shared/api/user-quest';

export const useGetUsersAttributes = () => {
  return useQuery({
    queryKey: ['attribute'],
    queryFn: () => getUsersAttributes(),
  });
};
