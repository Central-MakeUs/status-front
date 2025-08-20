import { socialLogin } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const usePostSocialLogin = () => {
  return useMutation({
    mutationFn: socialLogin,
  });
};
