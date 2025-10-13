import { questHandlers } from '@/app/mocks/handler/questHandlers';
import { attributeHandlers } from '@/app/mocks/handler/attributeHandlers';
import { usersHandlers } from '@/app/mocks/handler/usersHandlers';
import { authHandlers } from '@/app/mocks/handler/authHandlers';

export const handlers = [
  ...questHandlers,
  ...attributeHandlers,
  ...usersHandlers,
  ...authHandlers,
];
