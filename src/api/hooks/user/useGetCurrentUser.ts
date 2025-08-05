import { getCurrentUser } from '@/api/users';
import { useQuery } from '@tanstack/react-query';

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
