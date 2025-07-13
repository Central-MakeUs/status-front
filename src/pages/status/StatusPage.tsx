import { Header } from '@/pages/status/components/Header/Header';
import { RadarChart } from '@/pages/status/components/RadarChart/RadarChart';
import { QuestList } from '@/pages/status/components/QuestList/QuestList';
import { useGetUserInfo } from '@/api/hooks/user/useGetUserInfo';
import { useGetUserQuests } from '@/api/hooks/quest';
import { useGetStatusList } from '@/api/hooks/status/useGetStatus';

const StatusPage = () => {
  const userId = '10';
  const { data: userInfo } = useGetUserInfo(userId);
  const { data: statusLists } = useGetStatusList(userId);
  const { data: quests } = useGetUserQuests(userId);

  // const dataLists = [
  //   [60, 60, 80, 60, 60, 65], // 의지력, 집중력, 자기 통제력, 창의성, 성실성, 대담성 각각 점수
  //   [75, 75, 65, 70, 60, 75], // 문장술, 창조기술, 학습 집중, 신체 수련, 기술 응용, 공감 소통 각각 점수
  // ];

  // // 위와 동일 1 : 버닝, 0: 일반 -1: 정체
  // const growthStatusList = [
  //   [1, 0, 0, -1, 0, 0],
  //   [1, 1, -1, 0, 0, -1],
  // ];

  return (
    <>
      {userInfo && (
        <Header
          nickname={userInfo.nickname}
          level={userInfo.level}
          levelPercent={userInfo.levelPercent}
          profileImage={userInfo.profileImageUrl}
        />
      )}
      <main className="main">
        {statusLists && userInfo && (
          <RadarChart
            mentalData={statusLists.statusDataList[0]}
            skillData={statusLists.statusDataList[1]}
            profileImage={userInfo.profileImageUrl}
            growthStatusList={statusLists.growthStatusList}
          />
        )}
        {quests && <QuestList quests={quests} />}
      </main>
    </>
  );
};
export default StatusPage;
