import { SUB_QUEST_FREQUENCY } from '@/constants/quest';
import type { MainQuest, Quest, UserSubQuest } from '@/types/quest';

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

export const mockMainQuests: MainQuest[] = [
  {
    id: '1',
    title: '일주일간 하루 알림 확인 시간 제한하기',
  },
  {
    id: '2',
    title: '아침 1시간동안 핸드폰 잠금 유지 루틴 도전',
  },
  {
    id: '3',
    title:
      '3일 이상 SNS 사용 시간 30분 미만으로 유지하기 (2줄까지 가능, 3줄 이상은 안됨)',
  },
  {
    id: '4',
    title:
      '3일 이상 SNS 사용 시간 30분 미만으로 유지하기 (2줄까지 가능, 3줄 이상은 안됨)3일 이상 SNS 사용 시간 30분 미만으로 유지하기 (2줄까지 가능, 3줄 이상은 안됨)',
  },
  {
    id: '5',
    title: 'test',
  },
  {
    id: '6',
    title: '독서 습관 만들기',
  },
  {
    id: '7',
    title: '운동 루틴 정착하기',
  },
  {
    id: '8',
    title: '명상 시간 갖기',
  },
  {
    id: '9',
    title: '일기 쓰기 습관',
  },
  {
    id: '10',
    title: '건강한 식단 유지하기',
  },
  {
    id: '11',
    title: '새로운 기술 학습하기',
  },
];

export const mockSubQuests: UserSubQuest[] = [
  {
    id: '1',
    desc: '기상 후 1시간동안 스마트폰 잠금 모드 유지',
    defaultFrequency: SUB_QUEST_FREQUENCY.DAILY.value,
    defaultRepeat: 1,
    frequency: SUB_QUEST_FREQUENCY.DAILY.value,
    repeatCnt: 1,
  },
  {
    id: '2',
    desc: '아침 알림 전면 차단 후 하루 시작',
    defaultFrequency: SUB_QUEST_FREQUENCY.WEEKLY.value,
    defaultRepeat: 1,
    frequency: SUB_QUEST_FREQUENCY.WEEKLY.value,
    repeatCnt: 1,
  },
  {
    id: '3',
    desc: '핸드폰 없이 아침 루틴(세면+식사+기록) 수행',
    defaultFrequency: SUB_QUEST_FREQUENCY.WEEKLY_2.value,
    defaultRepeat: 1,
    frequency: SUB_QUEST_FREQUENCY.WEEKLY_2.value,
    repeatCnt: 1,
  },
  {
    id: '4',
    desc: 'test',
    defaultFrequency: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    defaultRepeat: 3,
    frequency: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    repeatCnt: 3,
  },
  {
    id: '5',
    desc: '물 8잔 이상 마시기',
    defaultFrequency: SUB_QUEST_FREQUENCY.DAILY.value,
    defaultRepeat: 1,
    frequency: SUB_QUEST_FREQUENCY.DAILY.value,
    repeatCnt: 1,
  },
  {
    id: '6',
    desc: '30분 이상 산책하기',
    defaultFrequency: SUB_QUEST_FREQUENCY.WEEKLY.value,
    defaultRepeat: 1,
    frequency: SUB_QUEST_FREQUENCY.WEEKLY.value,
    repeatCnt: 1,
  },
  {
    id: '7',
    desc: '책 10페이지 이상 읽기',
    defaultFrequency: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    defaultRepeat: 1,
    frequency: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    repeatCnt: 1,
  },
  {
    id: '8',
    desc: '새로운 단어 5개 학습하기',
    defaultFrequency: SUB_QUEST_FREQUENCY.WEEKLY_2.value,
    defaultRepeat: 1,
    frequency: SUB_QUEST_FREQUENCY.WEEKLY_2.value,
    repeatCnt: 1,
  },
];
