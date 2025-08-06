import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGetUserAttributes } from '@/api/hooks/attribute/useGetUserAttributes';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepActions } from '@/pages/quest/new/components/StepActions/StepActions';
import { ATTRIBUTE_TYPES } from '@/constants/attribute';

import type { Attribute } from '@/types/attribute';

import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';

import classNames from 'classnames/bind';
import styles from './StepAttributePage.module.scss';

const cx = classNames.bind(styles);

interface AttributeGroupProps {
  attributes: Attribute[];
  isChecked: (attributeId: number) => boolean;
  handleClickAttribute: (attribute: Attribute) => void;
}

export const StepAttributePage = () => {
  const navigate = useNavigate();
  const { data: attributes } = useGetUserAttributes();
  const { selectedAttribute, setSelectedAttribute } = useQuestCreationStore(
    useShallow((state) => ({
      selectedAttribute: state.selectedAttribute,
      setSelectedAttribute: state.setSelectedAttribute,
    }))
  );

  const mentalityAttributes = attributes?.filter(
    (attribute: Attribute) => attribute.type === ATTRIBUTE_TYPES.MENTALITY
  );

  const skillAttributes = attributes?.filter(
    (attribute: Attribute) => attribute.type === ATTRIBUTE_TYPES.SKILL
  );

  const isAttributesSelected = selectedAttribute !== null;
  const isChecked = (attributeId: number) =>
    selectedAttribute?.attributeId === attributeId;

  const handleClickAttribute = (attribute: Attribute) => {
    setSelectedAttribute(attribute);
  };

  const handleClickNextButton = () => {
    if (!isAttributesSelected) {
      return;
    }

    navigate(PAGE_PATHS.QUEST_NEW_THEME);
  };

  return (
    <>
      <Header title="퀘스트 만들기" hasBackButton={true} />
      <main className="main">
        <StepTitle>성장시킬 능력치를 선택해주세요</StepTitle>

        <div
          role="radiogroup"
          aria-label="능력치 선택"
          className={cx('attribute')}
        >
          <AttributeGroup
            attributes={mentalityAttributes ?? []}
            isChecked={isChecked}
            handleClickAttribute={handleClickAttribute}
          />
          <AttributeGroup
            attributes={skillAttributes ?? []}
            isChecked={isChecked}
            handleClickAttribute={handleClickAttribute}
          />
        </div>
      </main>
      <StepActions
        disabled={!isAttributesSelected}
        onClick={handleClickNextButton}
      >
        다음
      </StepActions>
    </>
  );
};

const AttributeGroup = ({
  attributes,
  isChecked,
  handleClickAttribute,
}: AttributeGroupProps) => {
  return (
    <div className={cx('attribute-group')}>
      {attributes?.map((attribute) => (
        <div
          key={attribute.attributeId}
          role="radio"
          tabIndex={0}
          className={cx('attribute-radio')}
          aria-checked={isChecked(attribute.attributeId)}
          onClick={() => handleClickAttribute(attribute)}
        >
          <AttributeIcon
            id={attribute.attributeId}
            className={cx('attribute-icon')}
          />
          <div className={cx('attribute-name-cover')}>
            <span className={cx('attribute-name')}>{attribute.name}</span>
            <span
              className={cx({
                'badge-mentality': attribute.type === ATTRIBUTE_TYPES.MENTALITY,
                'badge-skill': attribute.type === ATTRIBUTE_TYPES.SKILL,
              })}
            >
              {attribute.type === ATTRIBUTE_TYPES.MENTALITY ? '정신' : '기술'}
            </span>
          </div>
          <div className={cx('attribute-level')}>Lv.{attribute.level}</div>
        </div>
      ))}
    </div>
  );
};

export default StepAttributePage;
