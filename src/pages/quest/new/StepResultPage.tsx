import { useNavigate, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { PAGE_PATHS } from '@/constants/pagePaths';
import IconLogo from '@/assets/icons/icon-character-result.svg?react';
import { StepActions } from '@/pages/quest/new/components/StepActions/StepActions';
import 'react-day-picker/dist/style.css';
import classNames from 'classnames/bind';
import styles from './StepResultPage.module.scss';
import { getSubQuestFrequencyLabel } from '@/constants/quest';
import { getDaysDifference } from '@/utils/date';
import { useEffect } from 'react';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';

const cx = classNames.bind(styles);

export const StepResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const createdQuestId = (location.state as { createdQuestId?: number })
    ?.createdQuestId;

  const { selectedMainQuest, subQuests, selectedSubQuestIds } =
    useQuestCreationStore(
      useShallow((state) => ({
        selectedMainQuest: state.selectedMainQuest,
        subQuests: state.subQuests,
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

  const filteredSubQuests = subQuests.filter((quest) =>
    selectedSubQuestIds.includes(quest.id)
  );
  const startDate = selectedMainQuest?.startDate;
  const endDate = selectedMainQuest?.endDate;
  const weeks = getDaysDifference(startDate ?? '', endDate ?? '');
  // console.log(selectedMainQuest?.attributes);
  const attributes = selectedMainQuest?.attributes ?? [];
  const handleClickDoneButton = () => {
    // zod로 검증 로직 추가
    // mutation

    navigate(PAGE_PATHS.QUEST);
  };

  console.log('Created Quest ID:', createdQuestId);
  return (
    <>
      <main className="main">
        <div className={cx('resultContainer')}>
          <p className={cx('mainQuestFrom')}>From. [아침을 지배하는 자]</p>
          <h1 className={cx('resultTitle')}>생성된 퀘스트가 도착했어요!</h1>
          <div className={cx('logoContainer')}>
            <IconLogo width={300} height={200} />
          </div>
          <div className={cx('mainQuestBox')}>
            <p className={cx('mainQuestDate')}>
              {selectedMainQuest &&
                `기한_${selectedMainQuest.endDate} (총 ${weeks}일)`}
            </p>
            <h2 className={cx('mainQuestTitle')}>
              {selectedMainQuest && selectedMainQuest.title}
            </h2>
            <div className={cx('mainQuestReward')}>
              {attributes.map((attr) => (
                <span key={attr.attributeId} className={cx('attribute')}>
                  <AttributeIcon id={attr.attributeId} />+{attr.exp}xp
                </span>
              ))}
            </div>
          </div>
          <div className={cx('subQuestList')}>
            {filteredSubQuests.map((subQuest) => (
              <div className={cx('subquestBox')} key={subQuest.id}>
                <strong className={cx('frequency')}>
                  {getSubQuestFrequencyLabel(subQuest.frequency)}
                </strong>
                <div className={cx('desc')}>{subQuest.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <StepActions onClick={handleClickDoneButton}>확인</StepActions>
    </>
  );
};

export default StepResultPage;
