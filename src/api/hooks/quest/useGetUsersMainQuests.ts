import { getUsersMainQuests } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUsersMainQuests = () => {
  return useQuery({
    queryKey: ['quests', 'me'],
    queryFn: () => getUsersMainQuests(),
  });
};
