import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepAction } from '@/pages/quest/new/components/StepAction/StepAction';
import { StepDescription } from '@/pages/quest/new/components/StepDescription/StepDescription';
import { getWeeksDifference } from '@/utils/date';

export const StepSchedulePage = () => {
  const navigate = useNavigate();
  const { selectedMainQuest, selectedSubQuestIds } = useQuestCreationStore(
    useShallow((state) => ({
      selectedMainQuest: state.selectedMainQuest,
      selectedSubQuestIds: state.selectedSubQuestIds,
    }))
  );
  /**
   * [TODO] URL로 접근하는 등 validation 체크 로직
   * 전체 스탭에서 공통화 할 수 있을지도 고민해보기 e.g. 라우터에서 처리?
   */
  useEffect(() => {
    if (selectedSubQuestIds.length === 0) {
      navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE, { replace: true });
    }
  }, [selectedSubQuestIds, navigate]);

  const startDate = selectedMainQuest?.startDate;
  const endDate = selectedMainQuest?.endDate;
  const weeks = getWeeksDifference(startDate ?? '', endDate ?? '');

  const isValidSchedule = startDate && endDate;

  const handleClickDoneButton = () => {
    if (!isValidSchedule) {
      return;
    }

    // zod로 검증 로직 추가
    // mutation

    navigate(PAGE_PATHS.QUEST_NEW_RESULT);
  };

  return (
    <>
      <Header title="퀘스트 만들기" hasBackButton={true} />
      <main className="main">
        <StepTitle>퀘스트를 몇 주간 수행할까요?</StepTitle>
        <StepDescription>
          {endDate === ''
            ? `${startDate} -`
            : `${startDate} - ${endDate} (총 ${weeks}주)`}
        </StepDescription>
      </main>
      <StepAction disabled={!isValidSchedule} onClick={handleClickDoneButton}>
        완료
      </StepAction>
    </>
  );
};

export default StepSchedulePage;
