export const PAGE_PATHS = {
  ROOT: '/',
  STATUS: '/status',
  QUEST: '/quest',
  HISTORY: '/history',
  PROFILE: '/profile',
} as const;

export const MAIN_PAGE_PATHS = {
  STATUS: PAGE_PATHS.STATUS,
  QUEST: PAGE_PATHS.QUEST,
  HISTORY: PAGE_PATHS.HISTORY,
  PROFILE: PAGE_PATHS.PROFILE,
} as const;
