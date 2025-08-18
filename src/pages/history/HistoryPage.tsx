import { Header } from '@/components/ui/Header/Header';
import { HistoryEmpty } from './components/HistoryEmpty/HistoryEmpty';
import { useGetUserCompletedMainQuests } from '@/api/hooks/quest/useGetUserCompletedMainQuests';
import { HistorySummary } from '@/pages/history/components/HistorySummary/HistorySummary';
import { HistoryCompletedMainQuests } from '@/pages/history/components/HistoryCompletedMainQuests/HistoryCompletedMainQuests';

const HistoryPage = () => {
  const { data: completedMainQuests } = useGetUserCompletedMainQuests();
  const {
    totalMainQuests,
    totalSubQuests,
    progress,
    averagePeriod,
    mainQuests,
  } = completedMainQuests ?? {};
  const completedMainQuestCount = completedMainQuests?.totalMainQuests || 0;

  return (
    <>
      <Header>
        <Header.Title>히스토리</Header.Title>
      </Header>
      <main className="main">
        {completedMainQuestCount === 0 ? (
          <HistoryEmpty />
        ) : (
          <>
            <HistorySummary
              totalMainQuests={totalMainQuests ?? 0}
              totalSubQuests={totalSubQuests ?? 0}
              progress={progress ?? 0}
              averagePeriod={averagePeriod ?? 0}
            />
            <HistoryCompletedMainQuests mainQuests={mainQuests ?? []} />
          </>
        )}
      </main>
    </>
  );
};

export default HistoryPage;
