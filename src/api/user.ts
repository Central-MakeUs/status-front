import { api } from '@/api/client';
import type { UserInfoDTO } from '@/api/types/user';

export const getUserInfo = async (userId: string): Promise<UserInfoDTO> => {
  const userInfo = await api.get<UserInfoDTO>(`/users/${userId}/userInfo`);
  return userInfo;
};
