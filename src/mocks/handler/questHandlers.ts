import { http, HttpResponse } from 'msw';
import { mockQuests, userQuestMapping } from '@/mocks/data/quest';
export const questHandlers = [
  http.get('/users/:userId/quests', ({ params }) => {
    const userId = params.userId as string;
    const userQuestIds = userQuestMapping[userId] || [];
    const userQuests = mockQuests.filter((quest) =>
      userQuestIds.includes(quest.id)
    );

    return HttpResponse.json(userQuests);
  }),
];
