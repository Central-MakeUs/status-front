import { Dialog } from '@/components/ui/Dialog/Dialog';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
import { Button } from '@/components/ui/Button/Button';

import type { AttributeReward } from '@/types/attribute';

import IconSubQuestReward from '@/assets/icons/icon-sub-quest-reward.svg?react';

import classNames from 'classnames/bind';
import styles from './SubQuestRewardDialog.module.scss';

const cx = classNames.bind(styles);

interface SubQuestRewardDialogProps {
  isOpen: boolean;
  attributes: AttributeReward[];
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
          <li key={attribute.attributeId} className={cx('reward-item')}>
            <AttributeIcon
              id={attribute.attributeId}
              className={cx('attribute-icon')}
            />
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
