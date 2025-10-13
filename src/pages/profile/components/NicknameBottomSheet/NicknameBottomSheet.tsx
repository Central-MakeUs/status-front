import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { usePatchNickname } from '@/api/hooks/user/usePatchNickname';
import { BottomSheet } from '@/shared/ui/BottomSheet/BottomSheet';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { Button } from '@/shared/ui/Button/Button';
import { NICKNAME_MAX_LENGTH } from '@/features/auth/config/constants';
import { nicknameSchema } from '@/schemas/authScheme';

import classNames from 'classnames/bind';
import styles from './NicknameBottomSheet.module.scss';

const cx = classNames.bind(styles);

interface NicknameBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NicknameBottomSheet = ({
  isOpen,
  onClose,
}: NicknameBottomSheetProps) => {
  const { user, setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    }))
  );
  const patchNickname = usePatchNickname();

  const originalNickname = user?.nickname ?? '';
  const [nickname, setNickname] = useState(originalNickname);
  const [nicknameError, setNicknameError] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (isOpen) {
      setNickname(originalNickname);
      setNicknameError(undefined);
    }
  }, [isOpen, originalNickname]);

  const isNicknameValid =
    nickname !== originalNickname && nicknameError === undefined;

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    if (nickname.length > NICKNAME_MAX_LENGTH) {
      return;
    }

    const result = nicknameSchema.safeParse({ nickname });
    setNickname(nickname);

    if (result.success) {
      setNicknameError(undefined);
    } else {
      setNicknameError(result.error.issues[0].message);
    }
  };

  const handleEditNickname = async () => {
    if (!user) {
      return;
    }

    patchNickname.mutate(
      { nickname },
      {
        onSuccess: () => {
          setUser({ ...user, nickname });
          onClose();
        },
      }
    );
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      className={cx('nickname-bottom-sheet')}
    >
      <BottomSheet.Header>
        <BottomSheet.Title>닉네임 설정</BottomSheet.Title>
        <BottomSheet.Description>
          닉네임은 한글, 영문, 숫자 조합만 가능해요
        </BottomSheet.Description>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <TextInput
          value={nickname}
          maxLength={NICKNAME_MAX_LENGTH}
          onChange={handleChangeNickname}
          errorMessage={nicknameError}
        />
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button
          variant="secondary"
          disabled={!isNicknameValid}
          onClick={handleEditNickname}
        >
          완료
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
};
