export const REWARD_STEP = {
  NONE: 'none',
  SUB_QUEST: 'subQuest',
  MAIN_QUEST: 'mainQuest',
  COMPLETED: 'completed',
} as const;

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

export const MAIN_QUEST_STATUS = {
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  DELETED: 'DELETED',
  WEEKLY_ACCOMPLISHED: 'WEEKLY_ACCOMPLISHED',
  COMPLETED: 'COMPLETED',
  ACCOMPLISHED: 'ACCOMPLISHED',
} as const;
