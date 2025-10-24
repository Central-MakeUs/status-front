import { BottomSheet } from '@/shared/ui/BottomSheet/BottomSheet';
import { Select } from '@/shared/ui/Selelct/Select';
import {
  ACTION_UNIT_TYPES,
  ACTION_UNIT_TYPE_OPTIONS,
  SUB_QUEST_FREQUENCY,
  SUB_QUEST_FREQUENCY_SELECT_OPTIONS,
} from '@/entities/sub-quest/config/constants';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { Button } from '@/shared/ui/Button/Button';
import type {
  SubQuest,
  SubQuestFrequencyValue,
} from '@/entities/sub-quest/model/types';

import classNames from 'classnames/bind';
import styles from './EditingSubQuestBottomSheet.module.scss';

const cx = classNames.bind(styles);

interface EditingSubQuestBottomSheetProps {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (isOpen: boolean) => void;
  editingSubQuest: SubQuest | null;
  handleChangeSubQuestFrequency: (value: SubQuestFrequencyValue) => void;
  handleChangeSubQuestRepeatCount: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleClickEditingDoneButton: () => void;
}

export const EditingSubQuestBottomSheet = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  editingSubQuest,
  handleChangeSubQuestFrequency,
  handleChangeSubQuestRepeatCount,
  handleClickEditingDoneButton,
}: EditingSubQuestBottomSheetProps) => {
  const actionUnitType = editingSubQuest?.actionUnitType;
  const actionUnitTypeOptions = actionUnitType
    ? ACTION_UNIT_TYPE_OPTIONS[actionUnitType]
    : undefined;
  const description = editingSubQuest?.desc.replace(
    /{actionUnitNum}/g,
    editingSubQuest.actionUnitNum.toString()
  );

  return (
    <BottomSheet
      isOpen={isBottomSheetOpen}
      onClose={() => setIsBottomSheetOpen(false)}
      className={cx('sub-quest-bottom-sheet')}
    >
      <BottomSheet.Header>
        <BottomSheet.Title>퀘스트 편집하기</BottomSheet.Title>
        <BottomSheet.Description>{description}</BottomSheet.Description>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <Select
          label="반복 주기"
          value={
            editingSubQuest?.frequencyType ?? SUB_QUEST_FREQUENCY.DAILY.value
          }
          options={SUB_QUEST_FREQUENCY_SELECT_OPTIONS}
          onChange={handleChangeSubQuestFrequency}
        />
        <TextInput
          className={cx('bottom-sheet-input')}
          type="number"
          inputMode="numeric"
          label={actionUnitTypeOptions?.label}
          value={
            editingSubQuest?.actionUnitNum === 0
              ? ''
              : editingSubQuest?.actionUnitNum
          }
          min={actionUnitTypeOptions?.min}
          max={actionUnitTypeOptions?.max}
          onChange={handleChangeSubQuestRepeatCount}
          disabled={editingSubQuest?.actionUnitType === ACTION_UNIT_TYPES.ONCE}
        />
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button variant="secondary" onClick={handleClickEditingDoneButton}>
          완료
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
};
