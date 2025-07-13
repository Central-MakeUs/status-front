import { api } from '@/api/client';
import type { UserInfoDTO } from '@/api/types/user';
import type { ApiResponse } from '@/api/types/api';

export const getUserInfo = async (userId: string): Promise<UserInfoDTO> => {
  const response = await api.get<ApiResponse<UserInfoDTO>>(
    `/users/${userId}/userInfo`
  );
  return (
    response.data ?? {
      nickname: '',
      level: 0,
      levelPercent: 0,
      profileImageUrl: '',
    }
  );
};
