export const PAGE_PATHS = {
  ROOT: '/',
  STATUS: '/status',
  QUEST: '/quest',
  QUEST_NEW_ATTRIBUTE: '/quest/new/attribute',
  QUEST_NEW_CATEGORY: '/quest/new/category',
  QUEST_NEW_MAIN_QUEST: '/quest/new/main-quest',
  QUEST_NEW_SUB_QUEST: '/quest/new/sub-quest',
  QUEST_NEW_SCHEDULE: '/quest/new/schedule',
  HISTORY: '/history',
  PROFILE: '/profile',
} as const;

export const MAIN_PAGE_PATHS = {
  STATUS: PAGE_PATHS.STATUS,
  QUEST: PAGE_PATHS.QUEST,
  HISTORY: PAGE_PATHS.HISTORY,
  PROFILE: PAGE_PATHS.PROFILE,
} as const;
