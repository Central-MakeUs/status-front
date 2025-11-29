import { Dialog } from '@/shared/ui/dialog/dialog';
import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';
import { Button } from '@/shared/ui/button/button';

import type { Attribute } from '@/entities/quest-template/model/quest-template';

import IconMainQuestReward from '@/assets/icons/icon-main-quest-reward.svg?react';

import classNames from 'classnames/bind';
import styles from './main-quest-reward-dialog.module.scss';

const cx = classNames.bind(styles);

interface MainQuestRewardDialogProps {
  isOpen: boolean;
  attributes: Attribute[];
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
