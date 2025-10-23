import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';
import type { BasicUsersDTO } from './dto';

export const getCurrentUser = async () => {
  const response = await api.get<ApiResponse<BasicUsersDTO>>('/users/me');
  return response.data;
};

export const updateNickname = async (
  payload: Pick<BasicUsersDTO, 'nickname'>
) => {
  return await api.patch<ApiResponse<BasicUsersDTO>>(
    '/users/nickname',
    payload
  );
};
