import { api } from '@/shared/api/client';
import type { OAuthLoginRequestDTO } from '@/features/auth/api/dto';
import type { BasicUsersDTO } from '@/entities/users/api/dto';
import type { ApiResponse } from '@/shared/api/types';
import type { SocialLoginReturnDTO } from '@/features/auth/model/types';

export const refreshAccessToken = async () => {
  return api.post<ApiResponse<BasicUsersDTO>>('/auth/refresh');
};

export const logout = async () => {
  return api.post<ApiResponse<void>>('/auth/logout');
};

export const socialLogin = async (payload: OAuthLoginRequestDTO) => {
  return await api.post<ApiResponse<SocialLoginReturnDTO>>(
    '/auth/login',
    payload
  );
};

export const guestLogin = async () => {
  const response = await api.post<ApiResponse<BasicUsersDTO>>('/auth/guest');
  return response.data ?? {};
};

export const authenticateUser = async () => {
  return await api.get<ApiResponse<boolean>>('/auth/me');
};
