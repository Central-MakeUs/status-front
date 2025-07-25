import { http, HttpResponse } from 'msw';
import { mockUserInfo } from '../data/userInfo';

export const API_URL = import.meta.env.VITE_API_URL;

export const userInfoHandlers = [
  http.get(`${API_URL}/users/:userId/userInfo`, ({ params }) => {
    // const userId = params.userId as string;
    console.log(params);

    return HttpResponse.json({
      data: mockUserInfo,
    });
  }),
];
