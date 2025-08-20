import { api } from '@/api/client';
import type { BasicUsersDTO, SignUpRequestDTO } from '@/api/types/users';
import type { ApiResponse } from '@/api/types/api';

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
