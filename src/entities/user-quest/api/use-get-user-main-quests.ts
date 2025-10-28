import { useQuery } from '@tanstack/react-query';
import { getUsersMainQuests } from '@/shared/api/user-quest';

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
