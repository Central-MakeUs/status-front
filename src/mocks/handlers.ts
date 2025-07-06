import { questHandlers } from '@/mocks/handler/questHandlers';
import { attributeHandlers } from '@/mocks/handler/attributeHandlers';
import { categoryHandlers } from '@/mocks/handler/categoryHandlers';

export const handlers = [
  ...questHandlers,
  ...attributeHandlers,
  ...categoryHandlers,
];
