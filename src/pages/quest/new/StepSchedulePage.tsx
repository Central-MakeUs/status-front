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
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import classNames from 'classnames/bind';
import styles from './StepSchedulePage.module.scss';

const cx = classNames.bind(styles);

export const StepSchedulePage = () => {
  const navigate = useNavigate();
  const { selectedMainQuest, selectedSubQuestIds, setEndDate } =
    useQuestCreationStore(
      useShallow((state) => ({
        selectedMainQuest: state.selectedMainQuest,
        selectedSubQuestIds: state.selectedSubQuestIds,
        setEndDate: state.setEndDate,
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
  // console.log(startDate, endDate);
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
          {endDate === '' ? (
            `${startDate} -`
          ) : (
            <span className={cx('highlight')}>
              {startDate} - {endDate}(총 {weeks}주)
            </span>
          )}
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
