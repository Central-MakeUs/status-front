import { api } from '@/api/client';
import type { UserInfo } from '@/types/user';

export const getUserInfo = async (userId: string) => {
  const userInfo = await api.get<UserInfo>(`/users/${userId}/userInfo`);
  return userInfo;
};
