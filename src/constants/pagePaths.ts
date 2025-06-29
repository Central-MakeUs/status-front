export const PAGE_PATHS = {
  STATUS: '/status',
  CHALLENGE: '/challenge',
  HISTORY: '/history',
  PROFILE: '/profile',
} as const;

export const MAIN_PAGE_PATHS = [
  PAGE_PATHS.STATUS,
  PAGE_PATHS.CHALLENGE,
  PAGE_PATHS.HISTORY,
  PAGE_PATHS.PROFILE,
] as const;
