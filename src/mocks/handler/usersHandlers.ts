import { http, HttpResponse } from 'msw';
import { mockUserInfo } from '@/mocks/data/users';
import type { SignUpRequestDTO } from '@/api/types/users';

export const API_URL = import.meta.env.VITE_API_URL;

// 로컬에서만 동작하고 배포 환경에서는 pass-through 처리
export const usersHandlers = [
  http.get(`${API_URL}/users/:userId/userInfo`, ({ params }) => {
    // const userId = params.userId as string;
    console.log(params);

    return HttpResponse.json({
      data: mockUserInfo,
    });
  }),
  http.post(`${API_URL}/users/sign-up`, async ({ request }) => {
    const { nickname } = (await request.json()) as SignUpRequestDTO;

    document.cookie =
      'accessToken=mock-access-token; path=/; SameSite=Lax; max-age=3000';
    document.cookie =
      'refreshToken=mock-refresh-token; path=/; SameSite=Lax; max-age=3000';

    return HttpResponse.json({
      status: '201',
      data: {
        id: '11',
        nickname,
        type: 'LOGIN',
      },
    });
  }),
];
