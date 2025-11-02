import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { Header } from '@/widgets/global-header/ui/header';
import { PAGE_PATHS } from '@/shared/config/paths';
import { useGetUsersAttributes } from '@/entities/user-quest/api/use-get-user-attributes';
import { useQuestCreationStore } from '@/features/create-quest/model/create-quest-store';
import { StepTitle } from '@/features/create-quest/ui/step-title/step-title';
import { StepActions } from '@/features/create-quest/ui/step-actions/step-actions';
import { ATTRIBUTE_TYPES } from '@/shared/config/attribute';

import type { Attribute } from '@/entities/user-quest/model/user-quest';

import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';

import classNames from 'classnames/bind';
import styles from './step-attribute-page.module.scss';

const cx = classNames.bind(styles);

interface AttributeGroupProps {
  attributes: Attribute[];
  isChecked: (attributeId: number) => boolean;
  handleClickAttribute: (attribute: Attribute) => void;
}

export const StepAttributePage = () => {
  const navigate = useNavigate();
  const { data: attributes } = useGetUsersAttributes();
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
      <Header>
        <Header.Title>퀘스트 만들기</Header.Title>
        <Header.BackButton />
      </Header>
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
        <button
          key={attribute.attributeId}
          type="button"
          role="radio"
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
        </button>
      ))}
    </div>
  );
};

export default StepAttributePage;
