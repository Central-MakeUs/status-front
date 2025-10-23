import { useMutation } from '@tanstack/react-query';
import { socialLogin } from './auth';

export const usePostSocialLogin = () => {
  return useMutation({
    mutationFn: socialLogin,
  });
};
