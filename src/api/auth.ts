import { api } from '@/api/client';
import type {
  AuthResponseDTO,
  OAuthLoginRequestDTO,
  OAuthProviderDTO,
} from '@/api/types/auth';
import type { UserInfoDTO } from '@/api/types/users';
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

export const googleLogin = async (payload: OAuthLoginRequestDTO) => {
  return await api.post<ApiResponse<OAuthProviderDTO>>(
    '/api/v1/auth/google-login',
    payload
  );
};

export const kakaoLogin = async (payload: OAuthLoginRequestDTO) => {
  return await api.post<ApiResponse<OAuthProviderDTO>>(
    '/api/v1/auth/kakao-login',
    payload
  );
};
