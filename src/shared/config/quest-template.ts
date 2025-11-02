export const REWARD_STEP = {
  NONE: 'none',
  SUB_QUEST: 'subQuest',
  MAIN_QUEST: 'mainQuest',
  COMPLETED: 'completed',
} as const;

export type RewardStep = (typeof REWARD_STEP)[keyof typeof REWARD_STEP];

export const MAIN_QUEST_STATUS = {
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  DELETED: 'DELETED',
  WEEKLY_ACCOMPLISHED: 'WEEKLY_ACCOMPLISHED',
  COMPLETED: 'COMPLETED',
  ACCOMPLISHED: 'ACCOMPLISHED',
} as const;

export type Status = (typeof MAIN_QUEST_STATUS)[keyof typeof MAIN_QUEST_STATUS];

export const DISPLAY_SUB_QUEST_COUNT = 4;

export const MAX_SUB_QUEST_COUNT = 3;

export const SUB_QUEST_FREQUENCY = {
  DAILY: {
    label: '매일',
    value: 'DAILY',
  },
  WEEKLY: {
    label: '주 1회',
    value: 'WEEKLY_1',
  },
  WEEKLY_2: {
    label: '주 2회',
    value: 'WEEKLY_2',
  },
  WEEKLY_3: {
    label: '주 3회',
    value: 'WEEKLY_3',
  },
  WEEKLY_4: {
    label: '주 4회',
    value: 'WEEKLY_4',
  },
  WEEKLY_5: {
    label: '주 5회',
    value: 'WEEKLY_5',
  },
  WEEKLY_6: {
    label: '주 6회',
    value: 'WEEKLY_6',
  },
  MONTHLY_1: {
    label: '월 1회',
    value: 'MONTHLY_1',
  },
  MONTHLY_2: {
    label: '월 2회',
    value: 'MONTHLY_2',
  },
  MONTHLY_3: {
    label: '월 3회',
    value: 'MONTHLY_3',
  },
  MONTHLY_4: {
    label: '월 4회',
    value: 'MONTHLY_4',
  },
} as const;

export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];

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
    value: 'EASY',
  },
  NORMAL: {
    label: '적당한 임무',
    value: 'NORMAL',
  },
  HARD: {
    label: '전설적인 도전',
    value: 'HARD',
  },
} as const;

export type SubQuestDifficulty =
  (typeof SUB_QUEST_DIFFICULTY)[keyof typeof SUB_QUEST_DIFFICULTY]['value'];

export const ACTION_UNIT_TYPES = {
  TIME_SECOND: '초',
  TIME_MINUTE: '분',
  TIME_HOUR: '시간',
  NUMBER_1: '개',
  NUMBER_2: '권',
  NUMBER_3: '회',
  DISTANCE: 'km',
  ONCE: 'once',
} as const;

export const ACTION_UNIT_TYPE_VALUES = Object.values(ACTION_UNIT_TYPES);

export const ACTION_UNIT_TYPE_OPTIONS = {
  [ACTION_UNIT_TYPES.TIME_SECOND]: {
    label: '초',
    min: 1,
    max: 60,
  },
  [ACTION_UNIT_TYPES.TIME_MINUTE]: {
    label: '분',
    min: 1,
    max: 300,
  },
  [ACTION_UNIT_TYPES.TIME_HOUR]: {
    label: '시간',
    min: 1,
    max: 24,
  },
  [ACTION_UNIT_TYPES.NUMBER_1]: {
    label: '개',
    min: 1,
    max: 999,
  },
  [ACTION_UNIT_TYPES.NUMBER_2]: {
    label: '권',
    min: 1,
    max: 999,
  },
  [ACTION_UNIT_TYPES.NUMBER_3]: {
    label: '횟수',
    min: 1,
    max: 999,
  },
  [ACTION_UNIT_TYPES.DISTANCE]: {
    label: 'km',
    min: 1,
    max: 999,
  },
  [ACTION_UNIT_TYPES.ONCE]: {
    label: '횟수',
    min: 1,
    max: 1,
  },
} as const;

export type ActionUnitTypeValue =
  (typeof ACTION_UNIT_TYPES)[keyof typeof ACTION_UNIT_TYPES];
