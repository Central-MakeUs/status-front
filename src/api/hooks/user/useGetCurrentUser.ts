import { getCurrentUser } from '@/api/users';
import { getCookie } from '@/utils/cookie';
import { useQuery } from '@tanstack/react-query';

export const useGetCurrentUser = () => {
  const accessToken = getCookie('access_token');

  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: getCurrentUser,
    enabled: !!accessToken,
  });
};
