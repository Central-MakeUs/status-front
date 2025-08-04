import { z } from 'zod';
import { isNotPastDate, isValidDateString } from '@/utils/date';
import { SUB_QUEST_FREQUENCY_VALUES } from '@/constants/quest';

export const questCreationSchema = z.object({
  theme: z.number().min(1, '테마를 선택해주세요.'),
  mainQuest: z.number().min(1, '메인 퀘스트를 선택해주세요.'),
  startDate: z
    .string()
    .min(1, '시작 날짜를 선택해주세요.')
    .refine(isValidDateString, '올바른 날짜 형식이 아닙니다.')
    .refine(isNotPastDate, '시작 날짜는 오늘이어야 합니다.'),
  endDate: z
    .string()
    .min(1, '종료 날짜를 선택해주세요.')
    .refine(isValidDateString, '올바른 날짜 형식이 아닙니다.')
    .refine(isNotPastDate, '종료 날짜는 오늘 이후여야 합니다.'),
  subQuests: z.array(
    z.object({
      id: z.number(),
      frequencyType: z.enum(SUB_QUEST_FREQUENCY_VALUES),
      actionUnitNum: z.number().min(1, '반복 횟수는 1 이상이어야 합니다.'),
    })
  ),
});

export type ValidatedQuestCreationData = z.infer<typeof questCreationSchema>;

export const validateQuestCreation = (data: unknown) => {
  return questCreationSchema.safeParse(data);
};
