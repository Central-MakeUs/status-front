export const REWARD_STEP = {
  NONE: 'none',
  SUB_QUEST: 'subQuest',
  MAIN_QUEST: 'mainQuest',
  COMPLETED: 'completed',
} as const;

export const MAIN_QUEST_STATUS = {
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  DELETED: 'DELETED',
  WEEKLY_ACCOMPLISHED: 'WEEKLY_ACCOMPLISHED',
  COMPLETED: 'COMPLETED',
  ACCOMPLISHED: 'ACCOMPLISHED',
} as const;
