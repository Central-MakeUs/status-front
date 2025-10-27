import { BottomSheet } from '@/shared/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/shared/ui/button/button';
import { Textarea } from '@/shared/ui/textarea/textarea';
import classNames from 'classnames/bind';
import styles from './quest-report-bottom-sheet.module.scss';
import type { SubQuestDifficulty } from '@/shared/model/quest-template';
import { SUB_QUEST_DIFFICULTY } from '@/shared/config/quest-template';
import type { UsersSubQuest } from '@/entities/user-quest/model/user-quest';

const cx = classNames.bind(styles);

interface QuestReportBottomSheetProps {
  isBottomSheetOpen: boolean;
  onClose: () => void;
  selectedSubQuest: UsersSubQuest | null;
  selectedDifficulty: SubQuestDifficulty | null;
  onChangeDifficulty: (difficulty: SubQuestDifficulty) => void;
  memo: string;
  onChangeMemo: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onQuestReport: () => void;
}

export const QuestReportBottomSheet = ({
  isBottomSheetOpen,
  onClose,
  selectedSubQuest,
  selectedDifficulty,
  onChangeDifficulty,
  memo,
  onChangeMemo,
  onQuestReport,
}: QuestReportBottomSheetProps) => {
  const disabled = !selectedSubQuest || !selectedDifficulty;

  return (
    <BottomSheet
      isOpen={isBottomSheetOpen}
      onClose={onClose}
      className={cx('quest-report-bottom-sheet')}
    >
      <BottomSheet.Header>
        <BottomSheet.Title>퀘스트 인증하기</BottomSheet.Title>
        <BottomSheet.Description>
          [{selectedSubQuest?.subQuestInfo.desc}]의 인증
        </BottomSheet.Description>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <BottomSheet.SubTitle>
          수행 난이도{' '}
          <em className={cx('highlight')}>
            {selectedSubQuest?.essential ? '(필수)' : ''}
          </em>
        </BottomSheet.SubTitle>
        <div role="radiogroup" className={cx('quest-report-radio-group')}>
          {Object.values(SUB_QUEST_DIFFICULTY).map((difficulty) => (
            <button
              key={difficulty.value}
              type="button"
              role="radio"
              aria-checked={selectedDifficulty === difficulty.value}
              className={cx(
                'quest-report-radio',
                difficulty.value.toLowerCase()
              )}
              onClick={() => onChangeDifficulty(difficulty.value)}
            >
              {difficulty.label}
            </button>
          ))}
        </div>
        <Textarea
          label="메모 최대(300자)"
          value={memo}
          onChange={onChangeMemo}
          placeholder="입력하세요."
          maxLength={300}
          className={cx('quest-report-textarea')}
        />
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button variant="secondary" disabled={disabled} onClick={onQuestReport}>
          이상, 퀘스트 완료.
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
};
