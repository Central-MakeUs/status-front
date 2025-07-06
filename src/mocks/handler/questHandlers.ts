import { http, HttpResponse } from 'msw';
import {
  mockMainQuests,
  mockQuests,
  userQuestMapping,
} from '@/mocks/data/quest';

export const questHandlers = [
  http.get('/users/:userId/quests', ({ params }) => {
    const userId = params.userId as string;
    const userQuestIds = userQuestMapping[userId] || [];
    const userQuests = mockQuests.filter((quest) =>
      userQuestIds.includes(quest.id)
    );

    return HttpResponse.json(userQuests);
  }),
  http.get('/quests/:categoryId', ({ request }) => {
    const params = new URL(request.url).searchParams;
    const limit = params.get('limit');

    const quests = mockMainQuests
      .sort(() => Math.random() - 0.5)
      .slice(0, Number(limit));

    return HttpResponse.json(quests);
  }),
];
