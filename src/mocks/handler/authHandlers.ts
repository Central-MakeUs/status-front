import { http, HttpResponse } from 'msw';
import { mockGoogleUser, mockPendingSocialUser } from '@/mocks/data/users';

export const API_URL = import.meta.env.VITE_API_URL;

// 로컬에서만 동작하고 배포 환경에서는 pass-through 처리
export const authHandlers = [
  http.post(`${API_URL}/auth/google-login`, async () => {
    document.cookie =
      'accessToken=mock-access-token; path=/; SameSite=Lax; max-age=3000';
    document.cookie =
      'refreshToken=mock-refresh-token; path=/; SameSite=Lax; max-age=3000';

    return HttpResponse.json({
      status: '200',
      data: mockGoogleUser,
    });
  }),
  http.post(`${API_URL}/auth/kakao-login`, async () => {
    return HttpResponse.json({
      status: '200',
      data: mockPendingSocialUser,
    });
  }),
];
