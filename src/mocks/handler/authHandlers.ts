import { http } from 'msw';

export const API_URL = import.meta.env.VITE_API_URL;

export const authHandlers = [
  http.post(`${API_URL}/auth/login`, async () => {}),
];
