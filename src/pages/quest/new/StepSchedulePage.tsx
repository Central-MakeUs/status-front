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
import { validateQuestCreation } from '@/schemas/questCreationSchema';
import type { QuestCreationRequestDTO } from '@/api/types/quest';
import { usePostUserQuest } from '@/api/hooks/quest/usePostUserQuest';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

import classNames from 'classnames/bind';
import styles from './StepSchedulePage.module.scss';

const cx = classNames.bind(styles);

export const StepSchedulePage = () => {
  const navigate = useNavigate();
  // [TODO] auth store에서 사용자 정보 가져오기
  const userId = '10';
  const {
    selectedMentalityAttribute,
    selectedSkillAttribute,
    selectedCategory,
    selectedMainQuest,
    selectedSubQuestIds,
    setEndDate,
    getSelectedSubQuests,
  } = useQuestCreationStore(
    useShallow((state) => ({
      selectedMentalityAttribute: state.selectedMentalityAttribute,
      selectedSkillAttribute: state.selectedSkillAttribute,
      selectedCategory: state.selectedCategory,
      selectedMainQuest: state.selectedMainQuest,
      selectedSubQuestIds: state.selectedSubQuestIds,
      setEndDate: state.setEndDate,
      getSelectedSubQuests: state.getSelectedSubQuests,
    }))
  );
  /**
   * [TODO] URL로 접근하는 등 validation 체크 로직
   * 전체 스탭에서 공통화 할 수 있을지도 고민해보기 e.g. 라우터에서 처리?
   */
  useEffect(() => {
    if (selectedSubQuestIds.length === 0) {
      navigate(PAGE_PATHS.QUEST_NEW_SUB_QUEST, { replace: true });
    }
  }, [selectedSubQuestIds, navigate]);

  const postUserQuest = usePostUserQuest();
  const startDate = selectedMainQuest?.startDate;
  const endDate = selectedMainQuest?.endDate;
  const weeks = getWeeksDifference(startDate ?? '', endDate ?? '');
  // console.log(startDate, endDate);
  const isValidSchedule = startDate && endDate;

  const handleClickDoneButton = () => {
    if (!isValidSchedule) {
      return;
    }

    const selectedSubQuests = getSelectedSubQuests();

    const validationResult = validateQuestCreation({
      selectedMentalityAttribute,
      selectedSkillAttribute,
      selectedCategory,
      selectedMainQuest,
      selectedSubQuestIds,
      subQuests: selectedSubQuests,
    });

    // [TODO] 생성 실패 에러 페이지 추가 필요
    if (!validationResult.success) {
      console.error(validationResult.error);
      return;
    }

    const validatedData = validationResult.data;

    const payload: QuestCreationRequestDTO = {
      userId,
      mentalityAttribute: validatedData.selectedMentalityAttribute,
      skillAttribute: validatedData.selectedSkillAttribute,
      category: validatedData.selectedCategory,
      mainQuest: validatedData.selectedMainQuest,
      subQuests: validatedData.subQuests,
    };

    postUserQuest.mutate(payload, {
      onSuccess: () => {
        navigate(PAGE_PATHS.QUEST_NEW_RESULT, {
          state: {
            createdQuestId: payload.mainQuest.id,
          },
        });
      },
      onError: () => {
        // [TODO] 생성 실패 에러 페이지 추가 필요
      },
    });
  };

  return (
    <>
      <Header title="퀘스트 만들기" hasBackButton={true} />
      <main className="main">
        <StepTitle>퀘스트를 몇 주간 수행할까요?</StepTitle>
        <StepDescription className={endDate === '' ? '' : 'active'}>
          {endDate === ''
            ? `${startDate} -`
            : `${startDate} - ${endDate} (총 ${weeks}주)`}
        </StepDescription>
        <div className={cx('calendar-wrapper')}>
          <DayPicker
            locale={ko}
            mode="range"
            navLayout="around"
            formatters={{
              formatCaption: (date, options) =>
                format(date, 'yyyy년 M월', options),
            }}
            selected={{
              from: startDate ? new Date(startDate) : undefined,
              to: endDate ? new Date(endDate) : undefined,
            }}
            onSelect={(range) => {
              if (!range?.to) return;
              setEndDate(format(range.to, 'yyyy-MM-dd'));
            }}
            defaultMonth={startDate ? new Date(startDate) : new Date()}
            disabled={[
              { before: new Date() },
              (date: Date) => {
                if (!startDate) return true;
                const start = new Date(startDate);
                const diffInTime =
                  date.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
                const diffInDays =
                  Math.round(diffInTime / (1000 * 60 * 60 * 24)) + 1;
                return diffInDays < 7 || diffInDays % 7 !== 0;
              },
            ]}
            modifiers={{
              // selectedRange: (date) => {
              //   if (!startDate || !endDate) return false;
              //   const d = new Date(date.setHours(0, 0, 0, 0));
              //   const start = new Date(new Date(startDate).setHours(0, 0, 0, 0));
              //   const end = new Date(new Date(endDate).setHours(0, 0, 0, 0));
              //   return d > start && d < end;
              // },
              myStart: (date) => {
                if (!startDate || endDate) return false;
                return (
                  date.setHours(0, 0, 0, 0) ===
                  new Date(startDate).setHours(0, 0, 0, 0)
                );
              },
              // myEnd: (date) => {
              //   if (!endDate) return false;
              //   return date.setHours(0, 0, 0, 0) === new Date(endDate).setHours(0, 0, 0, 0);
              // },
              saturday: (date) => date.getDay() === 6,
              sunday: (date) => date.getDay() === 0,
            }}
            modifiersClassNames={{
              myStart: cx('my-start'),
              // myEnd: cx('my-end'),
              saturday: cx('saturday'),
              sunday: cx('sunday'),
            }}
          />
        </div>
      </main>
      <StepAction disabled={!isValidSchedule} onClick={handleClickDoneButton}>
        완료
      </StepAction>
    </>
  );
};

export default StepSchedulePage;
