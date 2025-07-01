export const PAGE_PATHS = {
  ROOT: '/',
  STATUS: '/status',
  CHALLENGE: '/challenge',
  HISTORY: '/history',
  PROFILE: '/profile',
} as const;

export const MAIN_PAGE_PATHS = {
  STATUS: PAGE_PATHS.STATUS,
  CHALLENGE: PAGE_PATHS.CHALLENGE,
  HISTORY: PAGE_PATHS.HISTORY,
  PROFILE: PAGE_PATHS.PROFILE,
} as const;
