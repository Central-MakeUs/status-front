import { api } from './api-client';
import type { ApiResponse } from './api-client';
import type { AttributesReturnDTO } from './attribute.dto';
import type { BasicUsersDTO } from './user.dto';

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

export const getUsersAttributes = async (): Promise<AttributesReturnDTO[]> => {
  const response =
    await api.get<ApiResponse<AttributesReturnDTO[]>>('/attribute');
  return response.data || [];
};
