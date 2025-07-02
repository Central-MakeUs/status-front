import type { Quest } from '@/types/quest';

export const mockQuests: Quest[] = [
  {
    id: '1',
    title: '독서 습관 만들기',
    expiredAt: '2025-12-31T23:59:59Z',
    progress: 42,
    totalDays: 365,
    rewards: [{ statType: 'patience', exp: 50 }],
  },
  {
    id: '2',
    title: '운동 루틴 완성',
    expiredAt: '2025-06-30T23:59:59Z',
    progress: 100,
    totalDays: 177,
    rewards: [{ statType: 'patience', exp: 80 }],
  },
  {
    id: '3',
    title: '프로그래밍 공부',
    expiredAt: '2025-08-15T23:59:59Z',
    progress: 58,
    totalDays: 218,
    rewards: [{ statType: 'patience', exp: 100 }],
  },
  {
    id: '4',
    title: '요리 도전',
    expiredAt: '2025-07-20T23:59:59Z',
    progress: 67,
    totalDays: 187,
    rewards: [{ statType: 'patience', exp: 60 }],
  },
  {
    id: '5',
    title: '명상 실천',
    expiredAt: '2025-09-30T23:59:59Z',
    progress: 100,
    totalDays: 254,
    rewards: [{ statType: 'patience', exp: 120 }],
  },
  {
    id: '6',
    title: '영어 공부',
    expiredAt: '2025-05-31T23:59:59Z',
    progress: 85,
    totalDays: 120,
    rewards: [{ statType: 'patience', exp: 90 }],
  },
  {
    id: '7',
    title: '물 마시기 챌린지',
    expiredAt: '2025-03-31T23:59:59Z',
    progress: 100,
    totalDays: 31,
    rewards: [{ statType: 'patience', exp: 30 }],
  },
  {
    id: '8',
    title: '일찍 일어나기',
    expiredAt: '2025-06-30T23:59:59Z',
    progress: 25,
    totalDays: 91,
    rewards: [{ statType: 'patience', exp: 70 }],
  },
];

export const userQuestMapping: Record<string, string[]> = {
  '1': ['1', '2', '3', '6'],
  '2': ['2', '4', '5', '7', '8'],
  '3': ['1', '3', '4', '5', '6', '8'],
  '4': ['7', '8'],
};
