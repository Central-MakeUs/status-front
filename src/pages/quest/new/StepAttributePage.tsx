import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGetUserAttribute } from '@/api/hooks/attribute';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepAction } from '@/pages/quest/new/components/StepAction/StepAction';

import type { Attribute } from '@/types/attribute';

import classNames from 'classnames/bind';
import styles from './StepAttributePage.module.scss';

const cx = classNames.bind(styles);

export const StepAttributePage = () => {
  const navigate = useNavigate();
  // [TODO] auth store에서 사용자 정보 가져오기
  const userId = '10';
  const { data } = useGetUserAttribute(userId);
  const {
    selectedMentalityAttribute,
    selectedSkillAttribute,
    setSelectedMentalityAttribute,
    setSelectedSkillAttribute,
  } = useQuestCreationStore(
    useShallow((state) => ({
      selectedMentalityAttribute: state.selectedMentalityAttribute,
      selectedSkillAttribute: state.selectedSkillAttribute,
      setSelectedMentalityAttribute: state.setSelectedMentalityAttribute,
      setSelectedSkillAttribute: state.setSelectedSkillAttribute,
    }))
  );
  const currentCount = [
    selectedMentalityAttribute,
    selectedSkillAttribute,
  ].filter(Boolean).length;

  const mentalityAttributes = data?.filter(
    (attribute: Attribute) => attribute.type === 'mentality'
  );

  const skillAttributes = data?.filter(
    (attribute: Attribute) => attribute.type === 'skill'
  );

  const isAttributesSelected = currentCount === 2;

  const handleClickNextButton = () => {
    if (!isAttributesSelected) {
      return;
    }

    navigate(PAGE_PATHS.QUEST_NEW_CATEGORY);
  };

  return (
    <>
      <Header title="퀘스트 만들기" hasBackButton={true} />
      <main className="main">
        <StepTitle>
          성장하고 싶은 능력치를
          <br />
          능력치 분야별로 1개씩 선택해주세요
        </StepTitle>
        <p
          className={cx('attribute-counter', {
            highlight: currentCount > 0,
          })}
        >
          {currentCount}/2<span className="sr-only">개</span> 선택됨
        </p>

        <div className={cx('attribute')}>
          <div
            role="radiogroup"
            className={cx('attribute-radio-group')}
            aria-label="정신적 능력치 선택"
          >
            {mentalityAttributes?.map((attribute) => (
              <div
                key={attribute.attributeId}
                role="radio"
                tabIndex={0}
                className={cx('attribute-radio')}
                aria-checked={selectedMentalityAttribute === attribute}
                onClick={() => setSelectedMentalityAttribute(attribute)}
              >
                <div className={cx('attribute-name-cover')}>
                  {/* [TODO] 아이콘은 API 나오면 매핑 */}
                  <span className={cx('attribute-name')}>{attribute.name}</span>
                  <span className={cx('badge-mentality')}>정신</span>
                </div>
                <div className={cx('attribute-level')}>
                  Lv.{attribute.level}
                </div>
              </div>
            ))}
          </div>
          <div
            role="radiogroup"
            className={cx('attribute-radio-group')}
            aria-label="기술적 능력치 선택"
          >
            {skillAttributes?.map((attribute) => (
              <div
                key={attribute.attributeId}
                role="radio"
                tabIndex={0}
                className={cx('attribute-radio')}
                aria-checked={selectedSkillAttribute === attribute}
                onClick={() => setSelectedSkillAttribute(attribute)}
              >
                <div className={cx('attribute-name-cover')}>
                  <span className={cx('attribute-name')}>{attribute.name}</span>
                  <span className={cx('badge-skill')}>기술</span>
                </div>
                <div className={cx('attribute-level')}>
                  Lv.{attribute.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <StepAction
        disabled={!isAttributesSelected}
        onClick={handleClickNextButton}
      >
        다음
      </StepAction>
    </>
  );
};

export default StepAttributePage;
