import type { TierType } from '@/types/tier';
import { TierIcon } from '@/components/ui/TierIcon/TierIcon';

import classNames from 'classnames/bind';
import styles from './TierLevelList.module.css';
const cx = classNames.bind(styles);

export const TierLevelList = ({
  currentTier,
  currentLevel,
}: {
  currentTier: TierType;
  currentLevel: number;
}) => {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Dia'];
  return (
    <div className={cx('tier-list')}>
      {tiers.map((tier) => {
        return (
          <div
            key={tier}
            className={`${cx('tier-item')} ${tier === currentTier ? cx('active') : ''}`}
          >
            <span className={cx('tier-name')}>
              {tier}
              {tier === currentTier ? `_${currentLevel}` : ''}
            </span>
            <TierIcon id={tier} className={cx('tier-icon')} />
          </div>
        );
      })}
    </div>
  );
};

export default TierLevelList;
