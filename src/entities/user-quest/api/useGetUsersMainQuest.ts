import { useQuery } from '@tanstack/react-query';
import { getUsersMainQuest } from './user-quest';

export const useGetUsersMainQuest = (id: number) => {
  return useQuery({
    queryKey: ['main-quest', 'user', id],
    queryFn: () => getUsersMainQuest(id),
  });
};
