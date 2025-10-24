import type { TierType } from '@/entities/users/model/types';
import { TierIcon } from '@/shared/ui/TierIcon/TierIcon';
import classNames from 'classnames/bind';
import styles from './TierBottomSheet.module.scss';
import { BottomSheet } from '@/shared/ui/BottomSheet/BottomSheet';
import { Button } from '@/shared/ui/Button/Button';
import { TIER_TYPE } from '@/entities/users/config/constants';

const cx = classNames.bind(styles);

const TierLevelList = ({
  currentTier,
  currentLevel,
}: {
  currentTier: TierType;
  currentLevel: number;
}) => {
  const tiers = Object.values(TIER_TYPE);
  return (
    <div className={cx('tier-list')}>
      {tiers.map((tier) => {
        return (
          <div
            key={tier}
            className={`${cx('tier-item')} ${tier === currentTier ? cx('active') : ''}`}
          >
            <span className={cx('tier-name')}>
              {tier.toLowerCase()}
              {tier === currentTier ? ` ${currentLevel}` : ''}
            </span>
            <TierIcon id={tier} className={cx('tier-icon')} />
          </div>
        );
      })}
    </div>
  );
};

type TierLevelBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  tier: TierType;
  level: number;
};

const TierLevelBottomSheet = ({
  isOpen,
  onClose,
  tier,
  level,
}: TierLevelBottomSheetProps) => (
  <BottomSheet isOpen={isOpen} onClose={onClose}>
    <BottomSheet.Header>
      <BottomSheet.Title>전체 레벨 현황</BottomSheet.Title>
      <BottomSheet.Description>
        모든 레벨은 1-10 단계로 세분화됩니다.
      </BottomSheet.Description>
    </BottomSheet.Header>
    <BottomSheet.Content>
      <TierLevelList currentTier={tier} currentLevel={level} />
    </BottomSheet.Content>
    <BottomSheet.Footer>
      <Button variant="tertiary" onClick={onClose}>
        닫기
      </Button>
    </BottomSheet.Footer>
  </BottomSheet>
);

export default TierLevelBottomSheet;
