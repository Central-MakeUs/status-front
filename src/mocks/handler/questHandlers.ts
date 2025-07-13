import { http, HttpResponse } from 'msw';
import {
  mockMainQuests,
  mockQuests,
  mockSubQuests,
  userQuestMapping,
} from '@/mocks/data/quest';

export const questHandlers = [
  http.get('/users/:userId/quests', ({ params }) => {
    const userId = params.userId as string;
    const userQuestIds = userQuestMapping[userId] || [];
    const userQuests = mockQuests.filter((quest) =>
      userQuestIds.includes(quest.id)
    );

    return HttpResponse.json({
      data: userQuests,
    });
  }),
  http.get('/main-quests', ({ request }) => {
    const params = new URL(request.url).searchParams;
    const limit = params.get('limit');

    const quests = mockMainQuests
      .sort(() => Math.random() - 0.5)
      .slice(0, Number(limit));

    return HttpResponse.json({
      data: quests,
    });
  }),
  http.get('/sub-quests', ({ request }) => {
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
];
