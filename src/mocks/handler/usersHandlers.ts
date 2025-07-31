import { http, HttpResponse, passthrough } from 'msw';
import { mockGoogleUser, mockUserInfo } from '@/mocks/data/users';
import type { BasicUsersDTO, SignUpRequestDTO } from '@/api/types/users';

export const API_URL = import.meta.env.VITE_API_URL;

export const usersHandlers = [
  http.get(`${API_URL}/users/:userId/userInfo`, ({ params }) => {
    // const userId = params.userId as string;
    console.log(params);

    return HttpResponse.json({
      data: mockUserInfo,
    });
  }),
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
   * [TODO] 리턴값 추가되거나 조회 API 추가 필요
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
    if (!document.cookie.includes('access_token')) {
      return HttpResponse.json({
        status: '500',
        code: '00-001',
        message: '현재 앱에 문제가 발생했으니 관리자에게 문의해주세요.',
      });
    }

    return HttpResponse.json({
      status: '200',
      data: mockGoogleUser,
    });
  }),
];
