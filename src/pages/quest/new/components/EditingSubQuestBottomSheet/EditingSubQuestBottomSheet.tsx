import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Select } from '@/components/ui/Selelct/Select';
import {
  SUB_QUEST_FREQUENCY,
  SUB_QUEST_FREQUENCY_SELECT_OPTIONS,
} from '@/constants/quest';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { Button } from '@/components/ui/Button/Button';
import type { SubQuest, SubQuestFrequencyValue } from '@/types/quest';

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
  return (
    <BottomSheet
      isOpen={isBottomSheetOpen}
      onClose={() => setIsBottomSheetOpen(false)}
      className={cx('sub-quest-bottom-sheet')}
    >
      <BottomSheet.Header>
        <BottomSheet.Title>퀘스트 편집하기</BottomSheet.Title>
        <BottomSheet.Description>
          {editingSubQuest?.desc}
        </BottomSheet.Description>
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
          label={
            editingSubQuest?.actionUnitType === 'once'
              ? '횟수'
              : editingSubQuest?.actionUnitType
          }
          value={
            editingSubQuest?.actionUnitNum === 0
              ? ''
              : editingSubQuest?.actionUnitNum
          }
          onChange={handleChangeSubQuestRepeatCount}
          disabled={editingSubQuest?.actionUnitType === 'once'}
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
