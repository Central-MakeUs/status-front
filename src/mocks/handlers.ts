import { questHandlers } from '@/mocks/handler/questHandlers';
import { attributeHandlers } from '@/mocks/handler/attributeHandlers';
import { categoryHandlers } from '@/mocks/handler/categoryHandlers';
import { statusListHandler } from './handler/statusListHandler';
import { userInfoHandlers } from './handler/userInfoHandlers';

export const handlers = [
  ...questHandlers,
  ...attributeHandlers,
  ...categoryHandlers,
  ...statusListHandler,
  ...userInfoHandlers,
];
