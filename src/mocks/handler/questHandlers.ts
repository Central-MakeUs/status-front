import { http, HttpResponse, passthrough } from 'msw';
import {
  mockMainQuests,
  mockSubQuests,
  mockUsersMainQuests,
  mockUserSubQuests,
  mockCompletedHistory,
  mockSubQuestLogResponse,
} from '@/mocks/data/quest';
import type {
  CreateQuestRequestDTO,
  CreateQuestResponseDTO,
  RerollSubQuestRequestDTO,
  RewardResponseDTO,
} from '@/api/types/quest';
import { mockThemes } from '@/mocks/data/quest';
import { DISPLAY_SUB_QUEST_COUNT } from '@/constants/quest';
import { getWeeksDifference } from '@/utils/date';

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
  http.get(`${API_URL}/quest/get-subquests`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const quests = mockSubQuests.slice(0, 4);

    return HttpResponse.json({
      data: quests,
    });
  }),
  http.post(`${API_URL}/quest/reroll-subquests`, async ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const { selectedSubQuests, gottenSubQuests } =
      (await request.json()) as RerollSubQuestRequestDTO;

    const limit = DISPLAY_SUB_QUEST_COUNT - selectedSubQuests.length;

    const filteredSubQuests = mockSubQuests
      .filter((subQuest) => !gottenSubQuests?.includes(subQuest.id))
      .filter((subQuest) => !selectedSubQuests?.includes(subQuest.id))
      .slice(0, limit);

    return HttpResponse.json({
      data: filteredSubQuests,
    });
  }),
  http.post(`${API_URL}/quest/create`, async ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const requestData = (await request.json()) as CreateQuestRequestDTO;

    const newQuestId = `${Date.now() * (Math.random() + 0.5)}`;

    const createdQuest: CreateQuestResponseDTO = {
      id: Number(newQuestId),
      startDate: requestData.startDate,
      endDate: requestData.endDate,
      totalWeeks: getWeeksDifference(
        requestData.startDate,
        requestData.endDate
      ),
      title:
        mockMainQuests.find((quest) => quest.id === requestData.mainQuest)
          ?.name ?? '',
      attributes: [
        {
          id: 101,
          name: '제어',
          exp: 50,
        },
      ],
      subQuests: [...mockSubQuests.slice(0, 3)],
    };

    mockUsersMainQuests.push({
      id: createdQuest.id,
      title: createdQuest.title,
      startDate: createdQuest.startDate,
      endDate: createdQuest.endDate,
      progress: 0,
      attributes: createdQuest.attributes,
      totalWeeks: createdQuest.totalWeeks,
    });

    return HttpResponse.json({
      data: createdQuest,
    });
  }),

  http.get(`${API_URL}/quest/me`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    return HttpResponse.json({
      data: mockUsersMainQuests,
    });
  }),
  http.get(`${API_URL}/quest/today`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }
    const quests = mockUserSubQuests;

    return HttpResponse.json({
      data: quests,
    });
  }),
  http.get(`${API_URL}/quest/:mainQuestId`, ({ params }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const { mainQuestId } = params;
    const quest = mockUsersMainQuests.find(
      (quest) => quest.id.toString() === mainQuestId
    );

    return HttpResponse.json({
      data: quest,
    });
  }),
  http.get(`${API_URL}/quest/:mainQuestId/today`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }

    const quests = mockUserSubQuests;

    return HttpResponse.json({
      data: quests,
    });
  }),
  http.post(`${API_URL}/quest/sub`, async ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }
    console.log(request);

    // [TODO] 서브 퀘스트 인증 상태 업데이트
    // const userSubQuest = mockUserSubQuests.find(
    //   (userSubQuest) => userSubQuest.id === requestData.userSubQuestId
    // );

    return HttpResponse.json({
      data: mockSubQuestLogResponse,
    });
  }),

  http.patch(`${API_URL}/quest/sub`, async ({ request }) => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }
    const requestData = (await request.json()) as RewardResponseDTO;

    // [TODO] 서브 퀘스트 인증 상태 업데이트
    // const userSubQuest = mockUserSubQuests.find(
    //   (userSubQuest) => userSubQuest.id === requestData.userSubQuestId
    // );

    return HttpResponse.json({
      data: requestData,
    });
  }),

  http.get(`${API_URL}/quest/:mainQuestId/history`, () => {
    if (import.meta.env.MODE !== 'development') {
      return passthrough();
    }
    return HttpResponse.json({
      data: mockCompletedHistory,
    });
  }),
  http.delete(`${API_URL}/quest/:mainQuestId`, () => {
    return HttpResponse.json({
      data: {},
    });
  }),
];
