import { Header } from '@/widgets/global-header/ui/header';
import { HistoryEmpty } from './ui/history-empty';
import { HistorySummary } from '@/pages/history/ui/history-summary';
import { HistoryCompletedMainQuests } from '@/pages/history/ui/history-completed-main-quests';
import { useGetUsersStatistics } from '@/pages/history/api/use-get-user-statistics';
import { useGetUsersCompletedMainQuests } from '@/entities/user-quest/api/use-get-user-completed-main-quests';

const HistoryPage = () => {
  const { data: statistics } = useGetUsersStatistics();
  const { data: mainQuests } = useGetUsersCompletedMainQuests();

  const {
    totalMainQuests,
    totalSubQuestVerifications,
    averageCompletionRate,
    averageDurationDays,
  } = statistics ?? {};

  return (
    <>
      <Header>
        <Header.Title>히스토리</Header.Title>
      </Header>
      <main className="main">
        {totalMainQuests === 0 ? (
          <HistoryEmpty />
        ) : (
          <>
            <HistorySummary
              totalMainQuests={totalMainQuests ?? 0}
              totalSubQuestVerifications={totalSubQuestVerifications ?? 0}
              averageCompletionRate={averageCompletionRate ?? 0}
              averageDurationDays={averageDurationDays ?? 0}
            />
            <HistoryCompletedMainQuests mainQuests={mainQuests ?? []} />
          </>
        )}
      </main>
    </>
  );
};

export default HistoryPage;
