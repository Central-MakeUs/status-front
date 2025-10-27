import { Dialog } from '@/shared/ui/dialog/dialog';
import { Button } from '@/shared/ui/button/button';

interface UserWithdrawalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const UserWithdrawalDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: UserWithdrawalDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog>
      <Dialog.Title>회원을 탈퇴할까요?</Dialog.Title>
      <Dialog.Description>
        계정의 모든 기록이 삭제되며
        <br />
        동일 계정으로 회원가입을 해도 복구되지 않습니다.
      </Dialog.Description>
      <Dialog.Actions>
        <Button variant="primary" onClick={onClose}>
          취소
        </Button>
        <Button variant="secondary" onClick={onConfirm}>
          탈퇴
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
