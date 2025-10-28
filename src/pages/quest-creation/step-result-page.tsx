import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '@/shared/config/paths';
import { useQuestCreationStore } from '@/features/create-quest/model/create-quest-store';
import { StepActions } from '@/features/create-quest/ui/step-actions/step-actions';
import { getSubQuestFrequencyLabel } from '@/shared/config/quest-template';
import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';
import type { CreateQuestResponse } from '@/features/create-quest/model/create-quest';

import IconLogo from '@/assets/icons/icon-character-result.svg?react';

import classNames from 'classnames/bind';
import styles from './step-result-page.module.scss';
const cx = classNames.bind(styles);

import 'react-day-picker/dist/style.css';

export const StepResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clear = useQuestCreationStore((state) => state.clear);
  const createdQuestResponse = location.state?.response as CreateQuestResponse;

  useEffect(() => {
    if (!createdQuestResponse) {
      navigate(PAGE_PATHS.QUEST_NEW_ERROR, { replace: true });
    }
  }, [createdQuestResponse, navigate]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  const mainQuestTitle = createdQuestResponse.title;
  const endDate = createdQuestResponse.endDate;
  const weeks = createdQuestResponse.totalWeeks;
  const attributes = createdQuestResponse.attributes ?? [];
  const subQuests = createdQuestResponse.subQuests ?? [];
  const npcName = createdQuestResponse.npcName ?? '';

  const handleClickDoneButton = () => {
    navigate(PAGE_PATHS.QUEST);
  };

  return (
    <>
      <main className="main">
        <div className={cx('result-container')}>
          <p className={cx('main-quest-from')}>From. {npcName}</p>
          <h2 className={cx('result-title')}>생성된 퀘스트가 도착했어요!</h2>
          <div className={cx('logo-container')}>
            <IconLogo width={300} height={200} aria-hidden="true" />
          </div>
          <div className={cx('main-quest-box')}>
            <p className={cx('main-quest-date')}>
              {`기한_${endDate} (총 ${weeks}주)`}
            </p>
            <h2 className={cx('main-quest-title')}>{mainQuestTitle}</h2>
            <div className={cx('main-quest-reward')}>
              {attributes.map((attribute) => (
                <span key={attribute.id} className={cx('attribute')}>
                  <AttributeIcon id={attribute.id} />+{attribute.exp}xp
                </span>
              ))}
            </div>
          </div>
          <div className={cx('sub-quest-list')}>
            {subQuests.map((subQuest) => (
              <div className={cx('sub-quest-box')} key={subQuest.id}>
                <span>
                  {getSubQuestFrequencyLabel(subQuest.frequencyType)} |{' '}
                </span>
                {subQuest.attributes.map((attribute) => (
                  <span key={attribute.id} className={cx('sub-attribute')}>
                    {attribute.name}+{attribute.exp}
                  </span>
                ))}
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
