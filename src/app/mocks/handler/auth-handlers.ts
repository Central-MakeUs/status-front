import { http, HttpResponse, passthrough } from 'msw';
import {
  mockAppleUser,
  mockGoogleUser,
  mockGuestUser,
  mockPendingSocialUser,
} from '@/app/mocks/data/user';
import { SOCIAL_PROVIDER } from '@/features/auth/config/constants';
import { getCookie } from '@/shared/lib/cookie';

import type { OAuthLoginRequestDTO } from '@/features/auth/api/auth.dto';

export const API_URL = import.meta.env.VITE_API_URL;

export const authHandlers = [
  http.post(`${API_URL}/auth/guest`, async () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    document.cookie =
      'access_token=mock-access-token; path=/; SameSite=Lax; max-age=3600';
    document.cookie =
      'refresh_token=mock-refresh-token; path=/; SameSite=Lax; max-age=1209600';

    return HttpResponse.json({
      status: '201',
      data: mockGuestUser,
    });
  }),
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const { provider } = (await request.json()) as OAuthLoginRequestDTO;

    document.cookie =
      'access_token=mock-access-token; path=/; SameSite=Lax; max-age=3600';
    document.cookie =
      'refresh_token=mock-refresh-token; path=/; SameSite=Lax; max-age=1209600';

    let userData;

    if (provider === SOCIAL_PROVIDER.GOOGLE) {
      userData = mockGoogleUser;
    } else if (provider === SOCIAL_PROVIDER.KAKAO) {
      userData = mockPendingSocialUser;
    } else if (provider === SOCIAL_PROVIDER.APPLE) {
      userData = mockAppleUser;
    }

    return HttpResponse.json({
      status: '200',
      data: userData,
    });
  }),
  http.post(`${API_URL}/auth/logout`, async () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    if (!document.cookie.includes('access_token')) {
      return HttpResponse.json({
        status: '500',
        code: '00-001',
        message: '현재 앱에 문제가 발생했으니 관리자에게 문의해주세요.',
      });
    }

    document.cookie = 'access_token=; path=/; SameSite=Lax; max-age=0';
    document.cookie = 'refresh_token=; path=/; SameSite=Lax; max-age=0';

    return HttpResponse.json({
      status: '204',
    });
  }),
  http.post(`${API_URL}/auth/refresh`, async () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    document.cookie =
      'access_token=mock-access-token; path=/; SameSite=Lax; max-age=3600';

    return HttpResponse.json({
      status: '200',
      data: mockGoogleUser,
    });
  }),
  http.get(`${API_URL}/auth/me`, async () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const accessToken = getCookie('access_token');

    if (!accessToken) {
      return HttpResponse.json({
        status: '200',
        data: false,
      });
    }

    return HttpResponse.json({
      status: '200',
      data: true,
    });
  }),
];
