import { http, HttpResponse } from 'msw';
import { mockCategories } from '@/mocks/data/category';

export const API_URL = import.meta.env.VITE_API_URL;

export const categoryHandlers = [
  http.get(`${API_URL}/categories`, ({ request }) => {
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
