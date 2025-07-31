import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGetUserAttributes } from '@/api/hooks/attribute/useGetUserAttributes';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepDescription } from './components/StepDescription/StepDescription';
import { StepActions } from '@/pages/quest/new/components/StepActions/StepActions';
import { ATTRIBUTE_TYPES, MAX_ATTRIBUTE_COUNT } from '@/constants/attribute';

import type { Attribute } from '@/types/attribute';

import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';

import classNames from 'classnames/bind';
import styles from './StepAttributePage.module.scss';

const cx = classNames.bind(styles);

interface AttributeGroupProps {
  attributes: Attribute[];
  label: string;
  isChecked: (attributeId: number) => boolean;
  handleClickAttribute: (attribute: Attribute) => void;
}

export const StepAttributePage = () => {
  const navigate = useNavigate();
  const { data: attributes } = useGetUserAttributes();
  const { selectedAttributes, toggleAttributeSelection } =
    useQuestCreationStore(
      useShallow((state) => ({
        selectedAttributes: state.selectedAttributes,
        toggleAttributeSelection: state.toggleAttributeSelection,
      }))
    );
  const currentCount = selectedAttributes.length;

  const mentalityAttributes = attributes?.filter(
    (attribute: Attribute) => attribute.type === ATTRIBUTE_TYPES.MENTALITY
  );

  const skillAttributes = attributes?.filter(
    (attribute: Attribute) => attribute.type === ATTRIBUTE_TYPES.SKILL
  );

  const isAttributesSelected = currentCount > 0;
  const isChecked = (attributeId: number) =>
    selectedAttributes.some(
      (attribute) => attribute.attributeId === attributeId
    );

  const handleClickAttribute = (attribute: Attribute) => {
    if (
      currentCount >= MAX_ATTRIBUTE_COUNT &&
      !isChecked(attribute.attributeId)
    ) {
      return;
    }

    toggleAttributeSelection(attribute);
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
        <StepTitle>
          성장하고 싶은 능력치를
          <br />
          최대 2개 선택해 주세요
        </StepTitle>
        <StepDescription className={cx({ active: currentCount > 0 })}>
          {currentCount}/{MAX_ATTRIBUTE_COUNT}
          <span className="sr-only">개</span> 선택됨
        </StepDescription>

        <div className={cx('attribute')}>
          <AttributeGroup
            attributes={mentalityAttributes ?? []}
            label="정신적 능력치 선택"
            isChecked={isChecked}
            handleClickAttribute={handleClickAttribute}
          />
          <AttributeGroup
            attributes={skillAttributes ?? []}
            label="기술적 능력치 선택"
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
  label,
  isChecked,
  handleClickAttribute,
}: AttributeGroupProps) => {
  return (
    <div className={cx('attribute-group')} aria-label={label}>
      {attributes?.map((attribute) => (
        <div
          key={attribute.attributeId}
          role="checkbox"
          tabIndex={0}
          className={cx('attribute-checkbox')}
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
