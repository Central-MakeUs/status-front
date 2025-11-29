import { Dialog } from '@/shared/ui/dialog/dialog';
import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';
import { Button } from '@/shared/ui/button/button';

import IconSubQuestReward from '@/assets/icons/icon-sub-quest-reward.svg?react';
import type { Attribute } from '@/entities/quest-template/model/quest-template';

import classNames from 'classnames/bind';
import styles from './sub-quest-reward-dialog.module.scss';

const cx = classNames.bind(styles);

interface SubQuestRewardDialogProps {
  isOpen: boolean;
  attributes: Attribute[];
  onClaim: () => void;
}

export const SubQuestRewardDialog = ({
  isOpen,
  attributes,
  onClaim,
}: SubQuestRewardDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog>
      <IconSubQuestReward className={cx('icon-sub-quest-reward')} />
      <Dialog.Title>경험치 보상을 획득했어요!</Dialog.Title>
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
