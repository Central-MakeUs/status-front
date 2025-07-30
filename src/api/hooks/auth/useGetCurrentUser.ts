import { getCurrentUser } from '@/api/auth';
import { getCookie } from '@/utils/cookie';
import { useQuery } from '@tanstack/react-query';

export const useGetCurrentUser = () => {
  const accessToken = getCookie('accessToken');

  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: getCurrentUser,
    enabled: !!accessToken,
  });
};
