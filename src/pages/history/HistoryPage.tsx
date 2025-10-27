import { Header } from '@/widgets/global-header/ui/Header';
import { HistoryEmpty } from './ui/HistoryEmpty/HistoryEmpty';
import { HistorySummary } from '@/pages/history/ui/HistorySummary/HistorySummary';
import { HistoryCompletedMainQuests } from '@/pages/history/ui/HistoryCompletedMainQuests/HistoryCompletedMainQuests';
import { useGetUsersStatistics } from '@/pages/history/api/useGetUsersStatstics';
import { useGetUsersCompletedMainQuests } from '@/entities/user-quest/api/useGetUsersCompletedMainQuests';

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
