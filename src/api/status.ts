import { api } from '@/api/client';
import type { StatusListDTO } from '@/api/types/status';

export const getStatusList = async (userId: string): Promise<StatusListDTO> => {
  const statusList = await api.get<StatusListDTO>(
    `/users/${userId}/statusList`
  );
  return statusList;
};
