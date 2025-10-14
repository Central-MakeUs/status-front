import { api } from '@/shared/api/client';
import type { BasicUsersDTO, SignUpRequestDTO } from '@/entities/users/api/dto';
import type { ApiResponse } from '@/shared/api/types';
import type { OAuthLoginRequestDTO } from '@/features/auth/api/dto';

export const signUp = async (payload: SignUpRequestDTO) => {
  const response = await api.post<ApiResponse<BasicUsersDTO>>(
    '/users/sign-up',
    payload
  );
  return response.data ?? {};
};

export const withdrawal = async () => {
  return await api.delete<ApiResponse<void>>('/users/unregister');
};

export const updateNickname = async (
  payload: Pick<BasicUsersDTO, 'nickname'>
) => {
  return await api.patch<ApiResponse<BasicUsersDTO>>(
    '/users/nickname',
    payload
  );
};

export const getCurrentUser = async () => {
  const response = await api.get<ApiResponse<BasicUsersDTO>>('/users/me');
  return response.data;
};

export const connectSocialAccount = async (payload: OAuthLoginRequestDTO) => {
  const response = await api.patch<ApiResponse<BasicUsersDTO>>(
    '/users/connect-provider',
    payload
  );

  return response;
};
