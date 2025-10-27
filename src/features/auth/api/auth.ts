import { api } from '@/shared/api/api-client';
import type { ApiResponse } from '@/shared/api/types';
import type { BasicUsersDTO } from '@/entities/user/api/user.dto';
import type { OAuthLoginRequestDTO, SignUpRequestDTO } from './dto';
import type { SocialLoginReturnDTO } from '../model/types';

export const refreshAccessToken = async () => {
  return api.post<ApiResponse<BasicUsersDTO>>('/auth/refresh');
};

export const logout = async () => {
  return api.post<ApiResponse<void>>('/auth/logout');
};

export const socialLogin = async (payload: OAuthLoginRequestDTO) => {
  return await api.post<ApiResponse<SocialLoginReturnDTO>>(
    '/auth/login',
    payload
  );
};

export const guestLogin = async () => {
  const response = await api.post<ApiResponse<BasicUsersDTO>>('/auth/guest');
  return response.data ?? {};
};

export const authenticateUser = async () => {
  return await api.get<ApiResponse<boolean>>('/auth/me');
};

export const connectSocialAccount = async (payload: OAuthLoginRequestDTO) => {
  const response = await api.patch<ApiResponse<BasicUsersDTO>>(
    '/users/connect-provider',
    payload
  );

  return response;
};

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
