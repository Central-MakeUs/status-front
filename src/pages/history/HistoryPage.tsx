import { Header } from '@/shared/ui/Header/Header';
import { HistoryEmpty } from './components/HistoryEmpty/HistoryEmpty';
import { useGetUserCompletedMainQuests } from '@/entities/main-quest/api/useGetUserCompletedMainQuests';
import { HistorySummary } from '@/pages/history/components/HistorySummary/HistorySummary';
import { HistoryCompletedMainQuests } from '@/pages/history/components/HistoryCompletedMainQuests/HistoryCompletedMainQuests';
import { useGetuserStatistic } from '@/entities/main-quest/api/useGetUserStatstic';

const HistoryPage = () => {
  const { data: statistics } = useGetuserStatistic();
  const { data: mainQuests } = useGetUserCompletedMainQuests();

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
