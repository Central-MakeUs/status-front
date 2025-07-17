import { SUB_QUEST_FREQUENCY } from '@/constants/quest';
import type { MainQuest, UserMainQuest, UserSubQuest } from '@/types/quest';

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

export const mockUserMainQuests: UserMainQuest[] = [
  {
    id: '1',
    title: 'SNS 사용 절제 습관 만들기',
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    progress: 0,
    attributes: [
      { attributeId: 103, name: '제어', type: 'mentality', level: 1, exp: 100 },
      { attributeId: 102, name: '집중', type: 'mentality', level: 1, exp: 50 },
    ],
  },
  {
    id: '2',
    title: '스마트폰 사용 패턴 분석 습관 만들기',
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    progress: 30,
    attributes: [
      { attributeId: 203, name: '기록', type: 'skill', level: 1, exp: 100 },
      { attributeId: 103, name: '제어', type: 'mentality', level: 1, exp: 50 },
    ],
  },
];
