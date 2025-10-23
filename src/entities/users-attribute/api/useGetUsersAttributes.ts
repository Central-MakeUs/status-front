import { useQuery } from '@tanstack/react-query';
import { getUsersAttributes } from './usersAttribute';

export const useGetUsersAttributes = () => {
  return useQuery({
    queryKey: ['attribute'],
    queryFn: () => getUsersAttributes(),
  });
};
