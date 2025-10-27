import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useQuestCreationStore } from './model/quest-creation-store';
import { PAGE_PATHS } from '@/app/providers/paths';
import { Header } from '@/widgets/global-header/ui/header';
import { StepTitle } from './ui/step-title/step-title';
import { StepActions } from './ui/step-actions/step-actions';
import { StepDescription } from './ui/step-description/step-description';
import { getTodayString, getWeeksDifference } from '@/shared/lib/date';
import { validateQuestCreation } from './model/quest-creation-schema';
import { usePostCreationQuest } from './api/use-post-creation-quest';

import type { CreateQuestRequest } from './model/types';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

import classNames from 'classnames/bind';
import styles from './step-schedule-page.module.scss';

const cx = classNames.bind(styles);

export const StepSchedulePage = () => {
  const navigate = useNavigate();
  const {
    selectedTheme,
    selectedMainQuest,
    selectedSubQuestIds,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    getSelectedSubQuests,
  } = useQuestCreationStore(
    useShallow((state) => ({
      selectedTheme: state.selectedTheme,
      selectedMainQuest: state.selectedMainQuest,
      selectedSubQuestIds: state.selectedSubQuestIds,
      startDate: state.startDate,
      endDate: state.endDate,
      setStartDate: state.setStartDate,
      setEndDate: state.setEndDate,
      getSelectedSubQuests: state.getSelectedSubQuests,
      clear: state.clear,
    }))
  );

  useEffect(() => {
    if (selectedSubQuestIds.length === 0) {
      navigate(PAGE_PATHS.QUEST_NEW_SUB_QUEST, { replace: true });
    }
  }, [selectedSubQuestIds, navigate]);

  useEffect(() => {
    if (!startDate) {
      setStartDate(getTodayString());
    }
  }, [setStartDate, startDate]);

  const postCreationQuest = usePostCreationQuest();
  const weeks = getWeeksDifference(startDate ?? '', endDate ?? '');

  const isValidSchedule = startDate && endDate;

  const handleClickDoneButton = () => {
    if (!isValidSchedule) {
      return;
    }

    const selectedSubQuests = getSelectedSubQuests().map((subQuest) => ({
      id: subQuest.id,
      frequencyType: subQuest.frequencyType,
      actionUnitNum: subQuest.actionUnitNum,
    }));

    const validationResult = validateQuestCreation({
      theme: selectedTheme?.id,
      mainQuest: selectedMainQuest?.id,
      startDate,
      endDate,
      subQuests: selectedSubQuests,
    });

    if (!validationResult.success) {
      navigate(PAGE_PATHS.QUEST_NEW_ERROR);
      return;
    }

    const validatedData = validationResult.data;

    const payload: CreateQuestRequest = {
      theme: validatedData.theme,
      mainQuest: validatedData.mainQuest,
      startDate: validatedData.startDate,
      endDate: validatedData.endDate,
      subQuests: validatedData.subQuests,
    };

    postCreationQuest.mutate(payload, {
      onSuccess: (data) => {
        navigate(PAGE_PATHS.QUEST_NEW_RESULT, {
          state: {
            response: data,
          },
        });
      },
      onError: () => {
        navigate(PAGE_PATHS.QUEST_NEW_ERROR);
      },
    });
  };

  return (
    <>
      <Header>
        <Header.Title>퀘스트 만들기</Header.Title>
        <Header.BackButton />
      </Header>
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
      <StepActions disabled={!isValidSchedule} onClick={handleClickDoneButton}>
        완료
      </StepActions>
    </>
  );
};

export default StepSchedulePage;
