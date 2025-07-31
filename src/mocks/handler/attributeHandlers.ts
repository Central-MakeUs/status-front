import { http, HttpResponse } from 'msw';
import { mockAttributes } from '@/mocks/data/attribute';
import { getCookie } from '@/utils/cookie';

export const API_URL = import.meta.env.VITE_API_URL;

export const attributeHandlers = [
  http.get(`${API_URL}/users/:userId/attributes`, () => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      return new HttpResponse(null, { status: 401 });
    }
    return HttpResponse.json({
      data: mockAttributes,
    });
  }),
];
