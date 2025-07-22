import { api } from '@/api/client';
import type { UserInfoDTO } from '@/api/types/user';
import type { ApiResponse } from '@/api/types/api';

export const getUserInfo = async (userId: string): Promise<UserInfoDTO> => {
  const response = await api.get<ApiResponse<UserInfoDTO>>(
    `/users/${userId}/userInfo`
  );
  return (
    response.data ?? {
      id: '',
      email: '',
      nickname: '',
      providerType: 'google',
      providerId: '',
      tier: 'Bronze', // Assuming a default tier, adjust as necessary
      level: 0,
      levelPercent: 0,
      profileImageUrl: '',
    }
  );
};
