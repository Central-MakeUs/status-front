import type { StatusList } from '@/types/status';

export const mockStatusMap: Record<string, StatusList> = {
  '1': {
    mentality: [
      { id: 101, label: '건강', value: 60, growth: 1, level: 8, xpLeft: 40 },
      { id: 102, label: '자제력', value: 60, growth: 0, level: 2, xpLeft: 20 },
      { id: 103, label: '정체성', value: 80, growth: 0, level: 6, xpLeft: 60 },
      { id: 104, label: '의식', value: 60, growth: -1, level: 4, xpLeft: 30 },
      { id: 105, label: '의지', value: 60, growth: 0, level: 10, xpLeft: 50 },
      { id: 106, label: '자존감', value: 65, growth: 0, level: 7, xpLeft: 70 },
    ],
    skill: [
      { id: 201, label: '기록', value: 75, growth: 1, level: 9, xpLeft: 45 },
      { id: 202, label: '학습', value: 75, growth: 1, level: 5, xpLeft: 35 },
      { id: 203, label: '표현', value: 65, growth: -1, level: 3, xpLeft: 25 },
      { id: 204, label: '소통', value: 70, growth: 0, level: 6, xpLeft: 65 },
      { id: 205, label: '관계', value: 60, growth: 0, level: 11, xpLeft: 55 },
      { id: 206, label: '협업', value: 75, growth: -1, level: 8, xpLeft: 75 },
    ],
  },
};
