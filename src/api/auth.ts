import { api } from '@/api/client';
import type { AuthResponseDTO } from '@/api/types/auth';
import type { UserInfoDTO } from '@/api/types/user';
import type { ApiResponse } from '@/api/types/api';

export const getCurrentUser = async () => {
  return api.get<ApiResponse<UserInfoDTO>>('/auth/me');
};

export const refreshTokens = async () => {
  return api.post<ApiResponse<AuthResponseDTO>>('/auth/refresh');
};

export const logout = async () => {
  return api.post<ApiResponse<void>>('/auth/logout');
};

export const googleLogin = async (code: string) => {
  return api.post<ApiResponse<void>>('/auth/google', {
    code,
  });
};
