import { api } from '@/api/client';
import type {
  BasicUserDTO,
  SignUpRequestDTO,
  UserInfoDTO,
} from '@/api/types/users';
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
      providerType: 'GOOGLE',
      providerId: '',
      tier: 'Bronze', // Assuming a default tier, adjust as necessary
      level: 0,
      profileImageUrl: '',
    }
  );
};

export const signUp = async (payload: SignUpRequestDTO) => {
  return await api.post<ApiResponse<BasicUserDTO>>(
    '/api/v1/users/sign-up',
    payload
  );
};
