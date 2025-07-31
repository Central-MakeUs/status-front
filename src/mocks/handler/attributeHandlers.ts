import { http, HttpResponse, passthrough } from 'msw';
import { mockAttributes } from '@/mocks/data/attribute';
import { getCookie } from '@/utils/cookie';

export const API_URL = import.meta.env.VITE_API_URL;

export const attributeHandlers = [
  http.get(`${API_URL}/attribute`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const accessToken = getCookie('access_token');
    if (!accessToken) {
      return new HttpResponse(null, { status: 401 });
    }
    return HttpResponse.json({
      status: 200,
      data: mockAttributes,
    });
  }),
];
