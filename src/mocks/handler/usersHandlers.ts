import { http, HttpResponse, passthrough } from 'msw';
import { mockGoogleUser } from '@/mocks/data/users';
import type { BasicUsersDTO, SignUpRequestDTO } from '@/api/types/users';
import { getCookie } from '@/utils/cookie';

export const API_URL = import.meta.env.VITE_API_URL;

export const usersHandlers = [
  http.post(`${API_URL}/users/sign-up`, async ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const { nickname } = (await request.json()) as SignUpRequestDTO;

    document.cookie =
      'access_token=mock-access-token; path=/; SameSite=Lax; max-age=3600';
    document.cookie =
      'refresh_token=mock-refresh-token; path=/; SameSite=Lax; max-age=1209600';

    return HttpResponse.json({
      status: '201',
      data: {
        id: '11',
        nickname,
        type: 'LOGIN',
      },
    });
  }),
  http.delete(`${API_URL}/users/unregister`, async () => {
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
  /**
   * @description 닉네임 수정
   */
  http.patch(`${API_URL}/users/nickname`, async ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const { nickname } = (await request.json()) as Pick<
      BasicUsersDTO,
      'nickname'
    >;

    return HttpResponse.json({
      status: '204',
      data: {
        nickname,
      },
    });
  }),
  http.get(`${API_URL}/users/me`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const accessToken = getCookie('access_token');

    if (!accessToken) {
      return HttpResponse.json({
        status: '401',
        message: '로그인 후 이용해주세요.',
      });
    }

    return HttpResponse.json({
      status: '200',
      data: mockGoogleUser,
    });
  }),
];
