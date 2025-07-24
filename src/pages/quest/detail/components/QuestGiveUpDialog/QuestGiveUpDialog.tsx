import { Dialog } from '@/components/ui/Dialog/Dialog';
import { Button } from '@/components/ui/Button/Button';

interface QuestGiveUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const QuestGiveUpDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: QuestGiveUpDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog>
      <Dialog.Title>퀘스트를 포기할까요?</Dialog.Title>
      <Dialog.Description>
        삭제된 퀘스트는 되돌릴 수 없으며
        <br />
        중도 포기 시 보상을 받을 수 없습니다.
      </Dialog.Description>
      <Dialog.Actions>
        <Button variant="primary" onClick={onClose}>
          취소
        </Button>
        <Button variant="secondary" onClick={onConfirm}>
          포기하기
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
