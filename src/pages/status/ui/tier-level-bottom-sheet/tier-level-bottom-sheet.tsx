import { TierIcon } from '@/shared/ui/tier-icon/tier-icon';
import { BottomSheet } from '@/shared/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/shared/ui/button/button';
import {
  TIER_TYPE,
  DEFAULT_TIER,
  DEFAULT_TIER_LEVEL,
} from '@/shared/config/user';

import { useAuthStore } from '@/features/auth/model/auth-store';
import { useShallow } from 'zustand/react/shallow';

import styles from './tier-level-bottom-sheet.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface TierLevelBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const TierLevelBottomSheet = ({
  isOpen,
  onClose,
}: TierLevelBottomSheetProps) => {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );
  const tiers = Object.values(TIER_TYPE);
  const userTier = user?.tier.tier ?? DEFAULT_TIER;
  const userLevel = user?.tier.level ?? DEFAULT_TIER_LEVEL;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <BottomSheet.Header>
        <BottomSheet.Title>전체 레벨 현황</BottomSheet.Title>
        <BottomSheet.Description>
          모든 레벨은 1-10 단계로 세분화됩니다.
        </BottomSheet.Description>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <ul className={cx('tier-list')}>
          {tiers.map((tier) => (
            <li
              key={tier}
              className={cx('tier-item', { active: tier === userTier })}
            >
              <span className={cx('tier-name')}>
                {tier.toLowerCase()} {tier === userTier && userLevel}
              </span>
              <TierIcon id={tier} className={cx('tier-icon')} />
            </li>
          ))}
        </ul>
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button variant="tertiary" onClick={onClose}>
          닫기
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
};

export default TierLevelBottomSheet;
