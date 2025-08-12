import { z } from 'zod';
import {
  SUB_QUEST_FREQUENCY_VALUES,
  ACTION_UNIT_TYPE_VALUES,
} from '@/constants/quest';

export const subQuestEditingSchema = z.object({
  frequencyType: z.enum(SUB_QUEST_FREQUENCY_VALUES),
  actionUnitType: z.enum(ACTION_UNIT_TYPE_VALUES),
  actionUnitNum: z.number().min(1, '반복 횟수는 1 이상이어야 합니다.'),
});

export type SubQuestEditing = z.infer<typeof subQuestEditingSchema>;

export const validateSubQuestEditing = (data: unknown) => {
  return subQuestEditingSchema.safeParse(data);
};
