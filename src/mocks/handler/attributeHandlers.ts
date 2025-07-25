import { http, HttpResponse } from 'msw';
import { mockAttributes } from '@/mocks/data/attribute';

export const API_URL = import.meta.env.VITE_API_URL;

export const attributeHandlers = [
  http.get(`${API_URL}/users/:userId/attributes`, () => {
    return HttpResponse.json({
      data: mockAttributes,
    });
  }),
];
