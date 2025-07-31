import { http, HttpResponse, passthrough } from 'msw';
import {
  mockMainQuests,
  mockSubQuests,
  mockUserMainQuests,
  mockUserSubQuests,
  mockTodayCompletedQuests,
  mockCompletedHistory,
} from '@/mocks/data/quest';
import type {
  QuestCreationRequestDTO,
  UserSubQuestLogResponseDTO,
} from '@/api/types/quest';
import { mockThemes } from '@/mocks/data/quest';

export const API_URL = import.meta.env.VITE_API_URL;

export const questHandlers = [
  http.get(`${API_URL}/quest/get-themes`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const themes = mockThemes.sort(() => Math.random() - 0.5).slice(0, 6);

    return HttpResponse.json({
      data: themes,
    });
  }),
  http.get(`${API_URL}/quest/reroll-themes`, ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const params = new URL(request.url).searchParams;
    const themes = params.get('themes')?.split(',') ?? [];

    const filteredThemes = mockThemes
      .filter((theme) => !themes?.includes(theme.id.toString()))
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    return HttpResponse.json({
      data: filteredThemes,
    });
  }),
  http.get(`${API_URL}/quest/get-mainquests`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const quests = mockMainQuests.slice(0, 6);

    return HttpResponse.json({
      data: quests,
    });
  }),
  http.get(`${API_URL}/quest/reroll-mainquests`, ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const params = new URL(request.url).searchParams;
    const mainQuests = params.get('mainQuests')?.split(',') ?? [];

    const filteredQuests = mockMainQuests
      .filter((quest) => !mainQuests?.includes(quest.id.toString()))
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    return HttpResponse.json({
      data: filteredQuests,
    });
  }),

  http.get(`${API_URL}/users/:userId/main-quests`, () => {
    return HttpResponse.json({
      data: mockUserMainQuests,
    });
  }),
  http.get(`${API_URL}/users/:userId/main-quest/:mainQuestId`, ({ params }) => {
    const { mainQuestId } = params;

    const quest = mockUserMainQuests.find((quest) => quest.id === mainQuestId);

    return HttpResponse.json({
      data: quest,
    });
  }),
  http.get(`${API_URL}/sub-quests`, ({ request }) => {
    const params = new URL(request.url).searchParams;
    const limit = params.get('limit');
    const selectedSubQuestIds = params.get('selectedSubQuestIds');

    const selectedSubQuests = selectedSubQuestIds
      ? mockSubQuests.filter((subQuest) =>
          selectedSubQuestIds.includes(subQuest.id)
        )
      : [];

    const remainingCount = Number(limit) - selectedSubQuests.length;
    const unselectedSubQuests = mockSubQuests
      .filter((subQuest) =>
        selectedSubQuestIds ? !selectedSubQuestIds.includes(subQuest.id) : true
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.max(0, remainingCount));

    const subQuests = [...selectedSubQuests, ...unselectedSubQuests];

    return HttpResponse.json({
      data: subQuests,
    });
  }),
  http.post(`${API_URL}/users/:userId/quest`, async ({ request }) => {
    const requestData = (await request.json()) as QuestCreationRequestDTO;

    const newQuestId = `${Date.now() * (Math.random() + 0.5)}`;

    const createdQuest = {
      mainQuestId: newQuestId,
      title: requestData.mainQuest.title,
      startDate: requestData.mainQuest.startDate,
      endDate: requestData.mainQuest.endDate,
      progress: 0,
      totalDays: 0,
      expiredAt: requestData.mainQuest.endDate,
      rewards: [{ statType: 'patience', exp: 50 }],
      createdAt: new Date().toISOString(),
      subQuests: requestData.subQuests.map((subQuest) => ({
        ...subQuest,
        id: `sub_quest_${Date.now() * (Math.random() + 0.5)}`,
      })),
    };

    mockUserMainQuests.push({
      id: newQuestId,
      title: requestData.mainQuest.title,
      startDate: requestData.mainQuest.startDate,
      endDate: requestData.mainQuest.endDate,
      progress: 0,
      attributes: [
        {
          attributeId: 101,
          name: '제어',
          type: 'MENTALITY',
          level: 1,
          exp: 50,
        },
      ],
    });

    return HttpResponse.json({
      data: createdQuest,
    });
  }),

  http.get(
    `${API_URL}/users/:userId/main-quests/:mainQuestId/sub-quests`,
    () => {
      const quests = mockUserSubQuests;

      return HttpResponse.json({
        data: quests,
      });
    }
  ),
  http.post(`${API_URL}/users/:userId/sub-quest-log`, async ({ request }) => {
    const requestData = (await request.json()) as UserSubQuestLogResponseDTO;

    // [TODO] 서브 퀘스트 인증 상태 업데이트
    // const userSubQuest = mockUserSubQuests.find(
    //   (userSubQuest) => userSubQuest.id === requestData.userSubQuestId
    // );

    return HttpResponse.json({
      data: requestData,
    });
  }),
  http.get(`${API_URL}/users/:userId/today-completed-quests`, () => {
    return HttpResponse.json({
      data: mockTodayCompletedQuests,
    });
  }),
  http.get(`${API_URL}/users/:userId/completed-history`, () => {
    return HttpResponse.json({
      data: mockCompletedHistory,
    });
  }),
  http.post(`${API_URL}/users/:userId/main-quest/:mainQuestId/giveup`, () => {
    return HttpResponse.json({
      data: {},
    });
  }),
];
