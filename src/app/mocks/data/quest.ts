import { ACTION_UNIT_TYPES } from '@/shared/config/quest-template';
import { MAIN_QUEST_STATUS } from '@/shared/config/quest-template';
import type { MainQuest, Theme } from '@/shared/model/quest-template';
import { SUB_QUEST_FREQUENCY } from '@/shared/config/quest-template';
import type { UsersQuestStatisticsDTO } from '@/shared/api/quest-template.dto';
import type { SubQuest } from '@/shared/model/quest-template';
import type { WithStatusUsersMainQuestResponseDTO } from '@/entities/user-quest/api/user-quest.dto';
import type {
  UsersMainQuest,
  UsersSubQuest,
  CompletedQuest,
} from '@/entities/user-quest/model/user-quest';

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
    desc: '기상 후 {actionUnitNum}시간동안 스마트폰 잠금 모드 유지',
    frequencyType: SUB_QUEST_FREQUENCY.DAILY.value,
    actionUnitNum: 1,
    actionUnitType: ACTION_UNIT_TYPES.TIME_MINUTE,
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
    actionUnitType: ACTION_UNIT_TYPES.ONCE,
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
    actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 4,
    desc: 'test {actionUnitNum}개',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    actionUnitNum: 1,
    actionUnitType: ACTION_UNIT_TYPES.ONCE,
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 5,
    desc: '물 {actionUnitNum}잔 이상 마시기',
    frequencyType: SUB_QUEST_FREQUENCY.DAILY.value,
    actionUnitNum: 1,
    actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 6,
    desc: '{actionUnitNum}분 이상 산책하기',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY.value,
    actionUnitNum: 30,
    actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 7,
    desc: '책 {actionUnitNum}페이지 이상 읽기',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
    actionUnitNum: 10,
    actionUnitType: ACTION_UNIT_TYPES.NUMBER_2,
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
  {
    id: 8,
    desc: '새로운 단어 {actionUnitNum}개 학습하기',
    frequencyType: SUB_QUEST_FREQUENCY.WEEKLY_2.value,
    actionUnitNum: 5,
    actionUnitType: ACTION_UNIT_TYPES.NUMBER_1,
    attributes: [
      { id: 203, name: '기록', exp: 5 },
      { id: 103, name: '제어', exp: 3 },
    ],
  },
];

export const mockUsersMainQuests: UsersMainQuest[] = [
  {
    id: 1,
    title: 'SNS 사용 절제 습관 만들기',
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    progress: 0,
    attributes: [
      { id: 103, name: '제어', exp: 100 },
      { id: 102, name: '집중', exp: 50 },
    ],
    totalWeeks: 1,
  },
  {
    id: 2,
    title: '스마트폰 사용 패턴 분석 습관 만들기',
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    progress: 30,
    attributes: [
      { id: 203, name: '기록', exp: 100 },
      { id: 103, name: '제어', exp: 50 },
    ],
    totalWeeks: 1,
  },
];

export const mockUsersSubQuests: UsersSubQuest[] = [
  {
    subQuestInfo: {
      id: 1,
      desc: '기상 후 1시간동안 스마트폰 잠금 모드 유지',
      frequencyType: SUB_QUEST_FREQUENCY.WEEKLY_3.value,
      actionUnitNum: 3,
      actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
      attributes: [
        { id: 203, name: '기록', exp: 5 },
        { id: 103, name: '제어', exp: 3 },
      ],
    },
    repeatCnt: 2,
    essential: true,
  },
  {
    subQuestInfo: {
      id: 2,
      desc: '아침 알림 전면 차단 후 하루 시작',
      frequencyType: SUB_QUEST_FREQUENCY.DAILY.value,
      actionUnitNum: 1,
      actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
      attributes: [
        { id: 203, name: '기록', exp: 100 },
        { id: 103, name: '제어', exp: 50 },
      ],
    },
    repeatCnt: 1,
    essential: true,
  },
  {
    subQuestInfo: {
      id: 3,
      desc: '핸드폰 없이 아침 루틴(세면+식사+기록) 수행',
      frequencyType: SUB_QUEST_FREQUENCY.MONTHLY_3.value,
      actionUnitNum: 3,
      actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
      attributes: [
        { id: 203, name: '기록', exp: 5 },
        { id: 103, name: '제어', exp: 3 },
      ],
    },
    repeatCnt: 2,
    essential: false,
  },
];

export const mockTodayCompletedQuests: CompletedQuest[] = [
  {
    userSubQuest: {
      mainQuestId: 32,
      subQuestInfo: {
        id: 2,
        desc: '아침 알림 전면 차단 후 하루 시작',
        frequencyType: 'DAILY',
        actionUnitNum: 1,
        actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
        attributes: [
          { id: 203, name: '기록', exp: 5 },
          { id: 103, name: '제어', exp: 3 },
        ],
      },
      repeatCnt: 1,
      essential: true,
    },
    log: {
      id: 1,
      difficulty: 'EASY',
      memo: '일찍 일어나 알림을 껐음',
    },
  },
  {
    userSubQuest: {
      mainQuestId: 32,
      subQuestInfo: {
        id: 3,
        desc: '핸드폰 없이 아침 루틴(세면+식사+기록) 수행',
        frequencyType: 'DAILY',
        actionUnitNum: 1,
        actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
        attributes: [
          { id: 203, name: '기록', exp: 5 },
          { id: 103, name: '제어', exp: 3 },
        ],
      },
      repeatCnt: 1,
      essential: true,
    },
    log: {
      id: 2,
      difficulty: 'NORMAL',
      memo: '습관적으로 껐지만 조금 늦게 일어남',
    },
  },
  {
    userSubQuest: {
      mainQuestId: 32,
      subQuestInfo: {
        id: 4,
        desc: '핸드폰 없이 아침 루틴(세면+식사+기록) 수행',
        frequencyType: 'MONTHLY_3',
        actionUnitNum: 1,
        actionUnitType: ACTION_UNIT_TYPES.NUMBER_3,
        attributes: [
          { id: 203, name: '기록', exp: 5 },
          { id: 103, name: '제어', exp: 3 },
        ],
      },
      repeatCnt: 1,
      essential: false,
    },
    log: {
      id: 3,
      difficulty: 'HARD',
      memo: '핸드폰 없이 집중해서 루틴을 완수함',
    },
  },
];

function getRecentDates(days: number): string[] {
  const result: string[] = [];
  const today = new Date();
  for (let i = 0; i <= days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    result.push(`${yyyy}-${mm}-${dd}`);
  }
  return result;
}

export const mockCompletedHistory = getRecentDates(4).map((date) => ({
  date,
  logs: mockTodayCompletedQuests,
}));

export const mockSubQuestLogResponse = {
  subQuestRewards: [
    {
      id: 0,
      name: 'string',
      exp: 0,
    },
  ],
  mainQuestRewards: [
    {
      id: 0,
      name: 'string',
      exp: 0,
    },
  ],
  isMainQuestCompleted: true,
};

export const mockQuestStatistics: UsersQuestStatisticsDTO = {
  totalMainQuests: 2,
  totalSubQuestVerifications: 4,
  averageCompletionRate: 50,
  averageDurationDays: 7,
};

export const mockCompletedMainQuests: WithStatusUsersMainQuestResponseDTO[] = [
  {
    id: 1,
    title: 'SNS 사용 절제 습관 만들기',
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    progress: 0,
    attributes: [
      { id: 103, name: '제어', exp: 100 },
      { id: 102, name: '집중', exp: 50 },
    ],
    totalWeeks: 1,
    status: MAIN_QUEST_STATUS.FAILED,
  },
  {
    id: 2,
    title: '스마트폰 사용 패턴 분석 습관 만들기',
    startDate: '2025-01-01',
    endDate: '2025-01-07',
    progress: 100,
    attributes: [
      { id: 203, name: '기록', exp: 100 },
      { id: 103, name: '제어', exp: 50 },
    ],
    totalWeeks: 1,
    status: MAIN_QUEST_STATUS.COMPLETED,
  },
];
