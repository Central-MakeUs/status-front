import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './user';

interface UseGetCurrentUserProps {
  isAuthenticated?: boolean;
}

export const useGetCurrentUser = ({
  isAuthenticated,
}: UseGetCurrentUserProps) => {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => getCurrentUser(),
    enabled: isAuthenticated,
  });
};
