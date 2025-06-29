interface PageConfig {
  header?: {
    title?: string;
    hasBackButton?: boolean;
  };
  showBottomNavigation?: boolean;
}

export type PagePath = keyof typeof PAGE_PATHS;

export const PAGE_PATHS = {
  ROOT: '/',
  STATUS: '/status',
  CHALLENGE: '/challenge',
  HISTORY: '/history',
  PROFILE: '/profile',
} as const;

export const PAGE_CONFIG: Record<string, PageConfig> = {
  [PAGE_PATHS.STATUS]: {
    showBottomNavigation: true,
  },
  [PAGE_PATHS.CHALLENGE]: {
    header: { title: '퀘스트' },
    showBottomNavigation: true,
  },
  [PAGE_PATHS.HISTORY]: {
    header: { title: '히스토리', hasBackButton: true },
    showBottomNavigation: true,
  },
  [PAGE_PATHS.PROFILE]: {
    header: { title: '마이페이지' },
    showBottomNavigation: true,
  },
} as const;
