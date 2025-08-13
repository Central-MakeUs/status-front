import { Dialog } from '@/components/ui/Dialog/Dialog';
import { Button } from '@/components/ui/Button/Button';

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: LogoutDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog>
      <Dialog.Title>게스트 모드를 종료할까요?</Dialog.Title>
      <Dialog.Description>
        저장된 모든 데이터가 삭제되며
        <br />
        삭제된 데이터는 복구할 수 없습니다.
      </Dialog.Description>
      {/* <Dialog.Title>로그아웃할까요?</Dialog.Title>
      <Dialog.Description>
        현재 계정을 로그아웃하여도
        <br />
        동일 계정으로 재로그인이 가능합니다.
      </Dialog.Description> */}
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
