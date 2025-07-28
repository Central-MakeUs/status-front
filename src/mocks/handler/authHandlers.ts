import { http, HttpResponse, passthrough } from 'msw';
import { mockGoogleUser, mockPendingSocialUser } from '@/mocks/data/users';

export const API_URL = import.meta.env.VITE_API_URL;

export const authHandlers = [
  http.post(`${API_URL}/auth/google-login`, async () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

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
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    return HttpResponse.json({
      status: '200',
      data: mockPendingSocialUser,
    });
  }),
  http.post(`${API_URL}/auth/logout`, async () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    if (!document.cookie.includes('accessToken')) {
      return HttpResponse.json({
        status: '500',
        code: '00-001',
        message: '현재 앱에 문제가 발생했으니 관리자에게 문의해주세요.',
      });
    }

    document.cookie = 'accessToken=; path=/; SameSite=Lax; max-age=0';
    document.cookie = 'refreshToken=; path=/; SameSite=Lax; max-age=0';

    return HttpResponse.json({
      status: '204',
    });
  }),
];
