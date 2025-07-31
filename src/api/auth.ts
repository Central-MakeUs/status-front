import { api } from '@/api/client';
import type { OAuthLoginRequestDTO } from '@/api/types/auth';
import type { BasicUsersDTO } from '@/api/types/users';
import type { ApiResponse } from '@/api/types/api';
import type { SocialLoginReturnDTO } from '@/types/auth';

export const refreshToken = async () => {
  return api.post<ApiResponse<BasicUsersDTO>>('/auth/refresh');
};

export const logout = async () => {
  return api.post<ApiResponse<void>>('/auth/logout');
};

export const googleLogin = async (payload: OAuthLoginRequestDTO) => {
  return await api.post<ApiResponse<SocialLoginReturnDTO>>(
    '/auth/google-login',
    payload
  );
};

export const kakaoLogin = async (payload: OAuthLoginRequestDTO) => {
  return await api.post<ApiResponse<SocialLoginReturnDTO>>(
    '/auth/kakao-login',
    payload
  );
};
