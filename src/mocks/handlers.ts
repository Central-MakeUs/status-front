import { questHandlers } from '@/mocks/handler/questHandlers';
import { attributeHandlers } from '@/mocks/handler/attributeHandlers';
import { categoryHandlers } from '@/mocks/handler/categoryHandlers';
import { statusListHandler } from '@/mocks/handler/statusListHandler';
import { usersHandlers } from '@/mocks/handler/usersHandlers';
import { authHandlers } from '@/mocks/handler/authHandlers';

export const handlers = [
  ...questHandlers,
  ...attributeHandlers,
  ...categoryHandlers,
  ...statusListHandler,
  ...usersHandlers,
  ...authHandlers,
];
