import { getUsersAttributes } from '@/entities/users-attribute/api/usersAttribute';
import { useQuery } from '@tanstack/react-query';

export const useGetUserAttributes = () => {
  return useQuery({
    queryKey: ['attribute'],
    queryFn: () => getUsersAttributes(),
  });
};
