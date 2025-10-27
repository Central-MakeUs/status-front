import { Dialog } from '@/shared/ui/Dialog/Dialog';
import { AttributeIcon } from '@/shared/ui/AttributeIcon/AttributeIcon';
import { Button } from '@/shared/ui/Button/Button';

import type { AttributeDTO } from '@/shared/api/attribute.dto';

import IconMainQuestReward from '@/assets/icons/icon-main-quest-reward.svg?react';

import classNames from 'classnames/bind';
import styles from './MainQuestRewardDialog.module.scss';

const cx = classNames.bind(styles);

interface MainQuestRewardDialogProps {
  isOpen: boolean;
  attributes: AttributeDTO[];
  onClaim: () => void;
}

export const MainQuestRewardDialog = ({
  isOpen,
  attributes,
  onClaim,
}: MainQuestRewardDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog>
      <IconMainQuestReward className={cx('icon-main-quest-reward')} />
      <Dialog.Title>메인퀘스트 완료 보너스!</Dialog.Title>
      <ul className={cx('reward-list')}>
        {attributes.map((attribute) => (
          <li key={attribute.id} className={cx('reward-item')}>
            <AttributeIcon id={attribute.id} className={cx('attribute-icon')} />
            <span className={cx('attribute-text')}>+{attribute.exp}xp</span>
          </li>
        ))}
      </ul>
      <Dialog.Actions>
        <Button variant="secondary" onClick={onClaim}>
          모두 받기
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
