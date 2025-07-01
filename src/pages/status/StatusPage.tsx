import { Header } from '@/components/Status/Header/Header';
import { RadarChart } from '@/components/Status/RadarChart/RadarChart';
import { StatGrid } from '@/components/Status/StatGrid/StatGrid';
import { QuestList } from '@/components/Status/QuestList/QuestList';

import ProfileImage from '@/assets/image.svg?url';

export const StatusPage = () => {
  const MENTAL_DATA = [60, 60, 80, 60, 60, 65];
  const SKILL_DATA = [75, 75, 65, 70, 60, 75];
  return (
    <>
      <Header nickname={'userNickname'} level={1} levelPercent={21} />
      <RadarChart
        mentalData={MENTAL_DATA}
        skillData={SKILL_DATA}
        profileImage={ProfileImage}
      />
      <StatGrid />
      <QuestList />
    </>
  );
};
