import { z } from 'zod';
import { isNotPastDate, isValidDateString } from '@/utils/date';
import { SUB_QUEST_FREQUENCY_VALUES } from '@/constants/quest';

export const questCreationSchema = z.object({
  selectedMentalityAttribute: z.object({
    attributeId: z.number(),
    name: z.string().min(1, '정신적 능력치를 선택해주세요.'),
    type: z.literal('mentality'),
    level: z.number(),
  }),
  selectedSkillAttribute: z.object({
    attributeId: z.number(),
    name: z.string().min(1, '기술적 능력치를 선택해주세요.'),
    type: z.literal('skill'),
    level: z.number(),
  }),
  selectedCategory: z.object({
    id: z.string(),
    name: z.string().min(1, '카테고리를 선택해주세요.'),
  }),
  selectedMainQuest: z.object({
    id: z.string().min(1, '메인 퀘스트를 선택해주세요.'),
    title: z.string().min(1, '메인 퀘스트 제목이 필요합니다.'),
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
  }),
  selectedSubQuestIds: z
    .array(z.string())
    .min(1, '최소 1개의 서브 퀘스트를 선택해주세요.')
    .max(5, '최대 5개의 서브 퀘스트까지 선택할 수 있습니다.'),
  subQuests: z.array(
    z.object({
      id: z.string(),
      desc: z.string(),
      defaultFrequency: z.enum(SUB_QUEST_FREQUENCY_VALUES),
      frequency: z.enum(SUB_QUEST_FREQUENCY_VALUES),
      defaultRepeat: z.number(),
      repeatCnt: z.number().min(1, '반복 횟수는 1 이상이어야 합니다.'),
    })
  ),
});

export type ValidatedQuestCreationData = z.infer<typeof questCreationSchema>;

export const validateQuestCreation = (data: unknown) => {
  return questCreationSchema.safeParse(data);
};
