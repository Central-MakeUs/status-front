import { Dialog } from '@/components/ui/Dialog/Dialog';
import { Button } from '@/components/ui/Button/Button';

interface GuestWithdrawalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const GuestWithdrawalDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: GuestWithdrawalDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog>
      <Dialog.Title>게스트 모드를 종료할까요?</Dialog.Title>
      <Dialog.Description>
        저장된 모든 데이터가 삭제되며
        <br />
        삭제된 데이터는 복구할 수 없습니다.
      </Dialog.Description>
      <Dialog.Actions>
        <Button variant="primary" onClick={onClose}>
          취소
        </Button>
        <Button variant="secondary" onClick={onConfirm}>
          확인
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
