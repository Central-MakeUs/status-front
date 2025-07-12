import { api } from '@/api/client';
import type { StatusList } from '@/types/status';

export const getStatusList = async (userId: string) => {
  const statusList = await api.get<StatusList>(`/users/${userId}/statusList`);
  return statusList;
};
