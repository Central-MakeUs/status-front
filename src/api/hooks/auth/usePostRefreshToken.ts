import { refreshToken } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const usePostRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
  });
};
