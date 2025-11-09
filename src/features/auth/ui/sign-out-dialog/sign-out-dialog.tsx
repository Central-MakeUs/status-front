import { Dialog } from '@/shared/ui/dialog/dialog';
import { Button } from '@/shared/ui/button/button';
import { usePostSignOut } from '../../api/use-post-sign-out';

interface SignOutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignOutDialog = ({ isOpen, onClose }: SignOutDialogProps) => {
  const postSignOut = usePostSignOut();

  const handleSignOut = async () => {
    postSignOut.mutate();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog>
      <Dialog.Title>로그아웃할까요?</Dialog.Title>
      <Dialog.Description>
        현재 계정을 로그아웃하여도
        <br />
        동일 계정으로 재로그인이 가능합니다.
      </Dialog.Description>
      <Dialog.Actions>
        <Button variant="primary" onClick={onClose}>
          취소
        </Button>
        <Button variant="secondary" onClick={handleSignOut}>
          확인
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
