import { http, HttpResponse } from 'msw';
import { mockStatusMap } from '../data/statusList';

export const statusListHandler = [
  http.get('/users/:userId/statusList', ({ params }) => {
    const userId = params.userId as string;
    const userStatus = mockStatusMap[userId] || mockStatusMap['1']; // fallback

    return HttpResponse.json({
      data: userStatus,
    });
  }),
];
