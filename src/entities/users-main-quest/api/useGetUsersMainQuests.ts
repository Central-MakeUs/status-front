import { useQuery } from '@tanstack/react-query';
import { getUsersMainQuests } from './usersMainQuest';

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
