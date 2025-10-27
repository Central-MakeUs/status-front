import { useQuery } from '@tanstack/react-query';
import { getUsersAttributes } from './user';

export const useGetUsersAttributes = () => {
  return useQuery({
    queryKey: ['attribute'],
    queryFn: () => getUsersAttributes(),
  });
};
