import { Header } from '@/components/pages/Status/Header/Header';
import { RadarChart } from '@/components/pages/Status/RadarChart/RadarChart';
import { QuestList } from '@/components/pages/Status/QuestList/QuestList';

import ProfileImage from '@/assets/image.svg?url';

export const StatusPage = () => {
  const nickname = 'userNickname';
  const level = 1;
  const levelPercent = 21;
  const profileImageUrl = ProfileImage;
  const dataLists = [
    [60, 60, 80, 60, 60, 65], // 의지력, 집중력, 자기 통제력, 창의성, 성실성, 대담성 각각 점수
    [75, 75, 65, 70, 60, 75], // 문장술, 창조기술, 학습 집중, 신체 수련, 기술 응용, 공감 소통 각각 점수
  ];

  // 위와 동일 1 : 버닝, 0: 일반 -1: 정체
  const growthStatusList = [
    [1, 0, 0, -1, 0, 0],
    [1, 1, -1, 0, 0, -1],
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
      <Header
        nickname={nickname}
        level={level}
        levelPercent={levelPercent}
        profileImage={profileImageUrl}
      />
      <RadarChart
        mentalData={dataLists[0]}
        skillData={dataLists[1]}
        profileImage={profileImageUrl}
        growthStatusList={growthStatusList}
      />
      <QuestList quests={quests} />
    </>
  );
};
