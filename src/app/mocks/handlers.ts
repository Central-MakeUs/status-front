import { questHandlers } from '@/app/mocks/handler/quest-handlers';
import { attributeHandlers } from '@/app/mocks/handler/attribute-handlers';
import { usersHandlers } from '@/app/mocks/handler/user-handlers';
import { authHandlers } from '@/app/mocks/handler/auth-handlers';

export const handlers = [
  ...questHandlers,
  ...attributeHandlers,
  ...usersHandlers,
  ...authHandlers,
];
