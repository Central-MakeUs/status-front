import { getUsersMainQuests } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

interface UseGetUsersMainQuestsProps {
  isAuthenticated?: boolean;
}

export const useGetUsersMainQuests = ({
  isAuthenticated,
}: UseGetUsersMainQuestsProps = {}) => {
  return useQuery({
    queryKey: ['quest', 'me'],
    queryFn: () => getUsersMainQuests(),
    enabled: !!isAuthenticated,
  });
};
