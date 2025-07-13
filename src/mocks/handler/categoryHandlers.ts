import { http, HttpResponse } from 'msw';
import { mockCategories } from '@/mocks/data/category';

export const categoryHandlers = [
  http.get('/categories', ({ request }) => {
    const params = new URL(request.url).searchParams;
    const limit = params.get('limit');

    const categories = mockCategories
      .sort(() => Math.random() - 0.5)
      .slice(0, Number(limit));

    return HttpResponse.json({
      data: categories,
    });
  }),
];
