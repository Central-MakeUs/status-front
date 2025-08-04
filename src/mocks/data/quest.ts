import { SUB_QUEST_FREQUENCY } from '@/constants/quest';
import type {
  MainQuest,
  SubQuest,
  Theme,
  TodayCompletedQuest,
  UserMainQuest,
  UserSubQuest,
} from '@/types/quest';

export const mockThemes: Theme[] = [
  {
    id: 1,
    name: '디지털 사용 절제',
  },
  {
    id: 2,
    name: '건강 루틴 만들기',
  },
  {
    id: 3,
    name: '감정 인식 훈련',
  },
  {
    id: 4,
    name: '집중 환경 조성',
  },
  {
    id: 5,
    name: '창작 습관 만들기',
  },
  {
    id: 6,
    name: '의사소통 훈련',
  },
  {
    id: 7,
    name: '목표 계획 루틴',
  },
  {
    id: 8,
    name: '기록 습관 형성',
  },
  {
    id: 9,
    name: '학습 루틴 만들기',
  },
  {
    id: 10,
    name: '새로운 시도 도전',
  },
  {
    id: 11,
    name: '체력 단련 루틴',
  },
  {
    id: 12,
    name: '아침 루틴 정착',
  },
];

export const mockMainQuests: MainQuest[] = [
  {
    id: 1001,
    name: '스마트폰 사용 패턴 분석 습관 만들기',
  },
  {
    id: 1002,
    name: 'SNS 사용 절제 습관 만들기',
  },
  {
    id: 1003,
    name: '디지털 방해 없는 몰입 시간 습관 만들기',
  },
  {
    id: 1004,
    name: '디지털 사용 시간 추적 습관 만들기',
  },
  {
    id: 1005,
    name: '디지털 차단 도구 활용 습관 만들기',
  },
  {
    id: 1006,
    name: '디지털 행동 돌아보기 습관 만들기',
  },
  {
    id: 1007,
    name: '집중 방해 요인 인식 습관 실험하기',
  },
  {
    id: 1008,
    name: '디지털 절제 행동 일기 쓰기 습관 만들기',
  },
  {
    id: 1009,
    name: '디지털 절제 습관 유지력 분석하기',
  },
  {
    id: 1010,
    name: '디지털 절제 성공 사례 따라 실천해보기',
  },
  {
    id: 1011,
    name: '디지털 절제 시간대 정해서 목표 세우기',
  },
  {
    id: 1012,
    name: '디지털 알림 차단하고 집중 환경 만들기',
  },
  {
    id: 1013,
    name: '스마트폰 차단하고 집중 공부 습관 만들기',
  },
];

export const mockSubQuests: SubQuest[] = [
  {
    id: 1,
    desc: '기상 후 1시간동안 스마트폰 잠금 모드 유지',
    frequencyType: SUB_QUEST_FREQUENCY.DAILY.value,
    actionUnitNum: 1,
    actionUnitType: '분',
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 2,
    desc: '아침 알림 전면 차단 후 하루 시작',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY.value,
    actionUnitNum: 1,
    actionUnitType: '횟수',
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 3,
    desc: '핸드폰 없이 아침 루틴(세면+식사+기록) 수행',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY_2.value,
    actionUnitNum: 1,
    actionUnitType: '회',
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 4,
    desc: 'test',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    actionUnitNum: 1,
    actionUnitType: 'once',
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 5,
    desc: '물 8잔 이상 마시기',
    frequencyType: SUB_QUEST_FREQUENCY.DAILY.value,
    actionUnitNum: 1,
    actionUnitType: '회',
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 6,
    desc: '30분 이상 산책하기',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY.value,
    actionUnitNum: 1,
    actionUnitType: '회',
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 7,
    desc: '책 10페이지 이상 읽기',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    actionUnitNum: 1,
    actionUnitType: '권',
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 8,
    desc: '새로운 단어 5개 학습하기',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY_2.value,
    actionUnitNum: 1,
    actionUnitType: '개',
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
];

export const mockUserMainQuests: UserMainQuest[] = [
  {
    id: '1',
    title: 'SNS 사용 절제 습관 만들기',
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    progress: 0,
    attributes: [
      { attributeId: 103, name: '제어', type: 'MENTALITY', level: 1, exp: 100 },
      { attributeId: 102, name: '집중', type: 'MENTALITY', level: 1, exp: 50 },
    ],
  },
  {
    id: '2',
    title: '스마트폰 사용 패턴 분석 습관 만들기',
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    progress: 30,
    attributes: [
      { attributeId: 203, name: '기록', type: 'SKILL', level: 1, exp: 100 },
      { attributeId: 103, name: '제어', type: 'MENTALITY', level: 1, exp: 50 },
    ],
  },
];

export const mockUserSubQuests: UserSubQuest[] = [
  {
    id: '1',
    desc: '기상 후 1시간동안 스마트폰 잠금 모드 유지',
    defaultFrequency: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    defaultRepeat: 3,
    frequency: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    repeatCnt: 2,
    attributes: [
      { attributeId: 203, name: '기록', type: 'SKILL', level: 1, exp: 5 },
      { attributeId: 103, name: '제어', type: 'MENTALITY', level: 1, exp: 3 },
    ],
    essential: true,
  },
  {
    id: '2',
    desc: '아침 알림 전면 차단 후 하루 시작',
    defaultFrequency: SUB_QUEST_FREQUENCY.DAILY.value,
    defaultRepeat: 1,
    frequency: SUB_QUEST_FREQUENCY.DAILY.value,
    repeatCnt: 1,
    attributes: [
      { attributeId: 203, name: '기록', type: 'SKILL', level: 1, exp: 100 },
      { attributeId: 103, name: '제어', type: 'MENTALITY', level: 1, exp: 50 },
    ],
    essential: true,
  },
  {
    id: '3',
    desc: '핸드폰 없이 아침 루틴(세면+식사+기록) 수행',
    defaultFrequency: SUB_QUEST_FREQUENCY.MONTHLY_3.value,
    defaultRepeat: 3,
    frequency: SUB_QUEST_FREQUENCY.MONTHLY_3.value,
    repeatCnt: 1,
    attributes: [
      { attributeId: 203, name: '기록', type: 'SKILL', level: 1, exp: 5 },
      { attributeId: 103, name: '제어', type: 'MENTALITY', level: 1, exp: 3 },
    ],
    essential: false,
  },
];

export const mockTodayCompletedQuests: TodayCompletedQuest[] = [
  {
    id: '1',
    desc: '기상 후 1시간동안 스마트폰 잠금 모드 유지',
    xp: 30,
    frequency: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    attributes: [
      { attributeId: 203, name: '기록', type: 'SKILL', level: 1, exp: 5 },
      { attributeId: 103, name: '제어', type: 'MENTALITY', level: 1, exp: 3 },
    ],
    difficulty: 'easy',
    comment: '후후 이정도는 쉽죠?😈',
    essential: true,
    defaultFrequency: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    defaultRepeat: 3,
    repeatCnt: 2,
  },
  {
    id: '2',
    desc: '아침 알림 전면 차단 후 하루 시작',
    xp: 20,
    frequency: SUB_QUEST_FREQUENCY.DAILY.value,
    attributes: [
      { attributeId: 203, name: '기록', type: 'SKILL', level: 1, exp: 5 },
      { attributeId: 103, name: '제어', type: 'MENTALITY', level: 1, exp: 3 },
    ],
    difficulty: 'hard',
    comment: '매일매일 실천 중!',
    essential: true,
    defaultFrequency: SUB_QUEST_FREQUENCY.DAILY.value,
    defaultRepeat: 1,
    repeatCnt: 1,
  },
  {
    id: '3',
    desc: '핸드폰 없이 아침 루틴(세면+식사+기록) 수행',
    xp: 40,
    frequency: SUB_QUEST_FREQUENCY.MONTHLY_3.value,
    attributes: [
      { attributeId: 203, name: '기록', type: 'SKILL', level: 1, exp: 5 },
      { attributeId: 103, name: '제어', type: 'MENTALITY', level: 1, exp: 3 },
    ],
    difficulty: 'default',
    comment: '오늘도 루틴 성공!',
    essential: false,
    defaultFrequency: SUB_QUEST_FREQUENCY.MONTHLY_3.value,
    defaultRepeat: 3,
    repeatCnt: 1,
  },
];

function getRecentDates(days: number): string[] {
  const result: string[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    result.push(`${yyyy}.${mm}.${dd}`);
  }
  return result;
}

export const mockCompletedHistory = getRecentDates(4).map((date) => ({
  date,
  quests: mockTodayCompletedQuests,
}));
