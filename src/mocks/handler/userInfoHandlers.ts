import { http, HttpResponse } from 'msw';
import { mockUserInfo } from '../data/userInfo';
export const userInfoHandlers = [
  http.get('/users/:userId/userInfo', ({ params }) => {
    // const userId = params.userId as string;
    console.log(params);

    return HttpResponse.json(mockUserInfo);
  }),
];
