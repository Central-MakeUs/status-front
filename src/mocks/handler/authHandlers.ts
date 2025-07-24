import { http } from 'msw';

export const authHandlers = [http.post('/auth/login', async () => {})];
