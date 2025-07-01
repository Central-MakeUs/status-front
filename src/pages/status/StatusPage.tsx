import { Header } from '@/components/Status/Header/Header';
import { RadarChart } from '@/components/Status/RadarChart/RadarChart';
import { QuestList } from '@/components/Status/QuestList/QuestList';

import ProfileImage from '@/assets/image.svg?url';

export const StatusPage = () => {
  const MENTAL_DATA = [60, 60, 80, 60, 60, 65];
  const SKILL_DATA = [75, 75, 65, 70, 60, 75];
  const growthStatusList = [
    [1, 0, 0, -1, 0, 0],
    [1, 0, 0, -1, 0, 0],
  ];
  const quests = [
    {
      title: '아침 1시간동안 핸드폰 잠금 유지 루틴 도전',
      deadline: '2025.10.25',
      totalDays: 7,
      progress: 38,
    },
    {
      title: '아침 1시간동안 핸드폰 잠금 유지 루틴 도전',
      deadline: '2025.10.25',
      totalDays: 7,
      progress: 38,
    },
  ];

  return (
    <>
      <Header nickname={'userNickname'} level={1} levelPercent={21} />
      <RadarChart
        mentalData={MENTAL_DATA}
        skillData={SKILL_DATA}
        profileImage={ProfileImage}
        growthStatusList={growthStatusList}
      />
      <QuestList quests={quests} />
    </>
  );
};
