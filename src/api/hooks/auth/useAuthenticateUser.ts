import { useQuery } from '@tanstack/react-query';
import { authenticateUser } from '@/api/auth';
import { AUTH_CACHE_TIME } from '@/constants/auth';

export const useAuthenticateUser = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await authenticateUser();
      return data;
    },
    staleTime: AUTH_CACHE_TIME.STALE_TIME,
    gcTime: AUTH_CACHE_TIME.GC_TIME,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
