import type { SubQuestFrequencyValue } from '@/types/quest';

export const DISPLAY_SUB_QUEST_COUNT = 7;
export const MAX_SUB_QUEST_COUNT = 5;

export const SUB_QUEST_FREQUENCY = {
  DAILY: {
    label: '매일',
    value: 'daily',
  },
  EVERY_2_DAY: {
    label: '격일',
    value: 'every_2_day',
  },
  WEEKLY: {
    label: '주 1회',
    value: 'weekly',
  },
  WEEKLY_2: {
    label: '주 2회',
    value: 'weekly_2',
  },
  WEEKLY_3: {
    label: '주 3회',
    value: 'weekly_3',
  },
  MONTHLY_3: {
    label: '월 3회',
    value: 'monthly_3',
  },
} as const;

export const SUB_QUEST_FREQUENCY_SELECT_OPTIONS =
  Object.values(SUB_QUEST_FREQUENCY);

export const SUB_QUEST_FREQUENCY_VALUES = Object.values(
  SUB_QUEST_FREQUENCY
).map((item) => item.value);

export const getSubQuestFrequencyLabel = (
  value: SubQuestFrequencyValue
): string => {
  const option = Object.values(SUB_QUEST_FREQUENCY).find(
    (item) => item.value === value
  );
  return option?.label || '';
};

export const SUB_QUEST_DIFFICULTY = {
  EASY: {
    label: '가뿐한 퀘스트',
    value: 'easy',
  },
  DEFAULT: {
    label: '적당한 임무',
    value: 'default',
  },
  HARD: {
    label: '전설적인 도전',
    value: 'hard',
  },
} as const;

export const REWARD_STEP = {
  NONE: 'none',
  SUB_QUEST: 'subQuest',
  MAIN_QUEST: 'mainQuest',
  COMPLETED: 'completed',
} as const;
