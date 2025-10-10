import { SubQuestSkeleton } from '@/pages/quest/new/components/SubQuestSkeleton/SubQuestSkeleton';
import { getSubQuestFrequencyLabel } from '@/constants/quest';
import type { SubQuest } from '@/types/quest';

import IconCheckboxChecked from '@/assets/icons/icon-checkbox-checked.svg?react';
import IconCheckboxNormal from '@/assets/icons/icon-checkbox-normal.svg?react';
import IconEdit from '@/assets/icons/icon-edit.svg?react';

import classNames from 'classnames/bind';
import styles from './SubQuestList.module.scss';

const cx = classNames.bind(styles);

interface SubQuestListProps {
  subQuests: SubQuest[];
  selectedSubQuestIds: number[];
  isPending: boolean;
  handleClickSubQuest: (subQuest: SubQuest) => void;
  handleClickEditButton: (subQuest: SubQuest) => void;
}

export const SubQuestList = ({
  subQuests,
  selectedSubQuestIds,
  isPending,
  handleClickSubQuest,
  handleClickEditButton,
}: SubQuestListProps) => {
  return (
    <ul className={cx('step-sub-quest-list')}>
      {subQuests?.map((subQuest) => {
        const isChecked = selectedSubQuestIds.includes(subQuest.id);
        const shouldShowSkeleton = isPending && !isChecked;
        const rewards = subQuest.attributes
          .map((attribute) => `${attribute.name}+${attribute.exp}`)
          .join(', ');
        const description = subQuest.desc.replace(
          /{actionUnitNum}/g,
          subQuest.actionUnitNum.toString()
        );

        return (
          <li
            key={subQuest.id}
            role="none"
            className={cx('step-sub-quest-list-item')}
          >
            {shouldShowSkeleton ? (
              <SubQuestSkeleton />
            ) : (
              <>
                <button
                  role="checkbox"
                  type="button"
                  className={cx('checkbox')}
                  aria-checked={isChecked}
                  onClick={() => handleClickSubQuest(subQuest)}
                >
                  {isChecked ? (
                    <IconCheckboxChecked
                      className={cx('checkbox-icon')}
                      aria-hidden="true"
                    />
                  ) : (
                    <IconCheckboxNormal
                      className={cx('checkbox-icon')}
                      aria-hidden="true"
                    />
                  )}
                  <div className={cx('sub-quest-box')}>
                    <span className={cx('sub-quest-frequency')}>
                      {getSubQuestFrequencyLabel(subQuest.frequencyType)}
                    </span>
                    <span className={cx('sub-quest-rewards')}>{rewards}</span>
                  </div>
                  <p className={cx('sub-quest-description')}>{description}</p>
                </button>
                <button
                  type="button"
                  className={cx('button-edit')}
                  onClick={() => handleClickEditButton(subQuest)}
                >
                  <IconEdit className={cx('edit-icon')} aria-hidden="true" />
                  <span className="sr-only">수정</span>
                </button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
