import { http, HttpResponse } from 'msw';
import { mockAttributes } from '@/mocks/data/attribute';

export const attributeHandlers = [
  http.get('/users/:userId/attributes', () => {
    return HttpResponse.json(mockAttributes);
  }),
];
