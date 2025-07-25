import { http, HttpResponse } from 'msw';
import { mockStatusMap } from '../data/statusList';

export const API_URL = import.meta.env.VITE_API_URL;

export const statusListHandler = [
  http.get(`${API_URL}/users/:userId/statusList`, ({ params }) => {
    const userId = params.userId as string;
    const userStatus = mockStatusMap[userId] || mockStatusMap['1']; // fallback

    return HttpResponse.json({
      data: userStatus,
    });
  }),
];
