import { http, HttpResponse, passthrough } from 'msw';
import { mockAttributes } from '@/mocks/data/attribute';

export const API_URL = import.meta.env.VITE_API_URL;

export const attributeHandlers = [
  http.get(`${API_URL}/attribute`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    return HttpResponse.json({
      status: 200,
      data: mockAttributes,
    });
  }),
];
