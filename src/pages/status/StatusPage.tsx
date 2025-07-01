import { Header } from '@/components/Status/Header/Header';
import { RadarChart } from '@/components/Status/RadarChart/RadarChart';
import { StatGrid } from '@/components/Status/StatGrid/StatGrid';
import { QuestList } from '@/components/Status/QuestList/QuestList';

export const StatusPage = () => {
  return (
    <>
      <Header nickname={'userNickname'} level={1} levelPercent={21} />
      <RadarChart />
      <StatGrid />
      <QuestList />
    </>
  );
};
