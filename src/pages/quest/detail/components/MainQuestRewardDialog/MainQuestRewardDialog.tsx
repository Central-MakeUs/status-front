import { Dialog } from '@/components/ui/Dialog/Dialog';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
import { Button } from '@/components/ui/Button/Button';

import type { AttributeReward } from '@/types/attribute';

import IconMainQuestReward from '@/assets/icons/icon-main-quest-reward.svg?react';

import classNames from 'classnames/bind';
import styles from './MainQuestRewardDialog.module.scss';

const cx = classNames.bind(styles);

interface MainQuestRewardDialogProps {
  isOpen: boolean;
  attributes: AttributeReward[];
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
