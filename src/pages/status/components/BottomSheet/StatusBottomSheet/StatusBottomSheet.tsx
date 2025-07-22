import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { ATTRIBUTE_DESCS, ATTRIBUTE_TEXTS } from '@/constants/attribute';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
import BurningSVG from '@/assets/icons/icon-burning.svg?react';
import StagnationSVG from '@/assets/icons/icon-stagnation.svg?react';

import classNames from 'classnames/bind';
import styles from './StatusBottomSheet.module.scss';
const cx = classNames.bind(styles);

type StatusDetailBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  statusKey: number;
  status: {
    value: number;
    growth: number;
    level: number;
    fullXp: number;
    xpLeft: number;
  };
};

export const StatusDetailBottomSheet = ({
  isOpen,
  onClose,
  statusKey,
  status,
}: StatusDetailBottomSheetProps) => {
  const {
    value = 0,
    growth = 0,
    level = 1,
    fullXp = 100,
    xpLeft = fullXp - (status?.value ?? 0),
  } = status ?? {};

  const StatusIcon =
    growth === 1 ? BurningSVG : growth === -1 ? StagnationSVG : null;
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <BottomSheet.Header>
        <BottomSheet.Title>
          <div className={cx('status-title')}>
            <AttributeIcon id={statusKey} />[
            {ATTRIBUTE_TEXTS[statusKey as keyof typeof ATTRIBUTE_TEXTS]}] 능력치
          </div>
        </BottomSheet.Title>
        <BottomSheet.Description>
          {ATTRIBUTE_DESCS[statusKey as keyof typeof ATTRIBUTE_DESCS]}
        </BottomSheet.Description>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <div className={cx('status-detail')}>
          <div className={cx('status-text')}>
            <div className={cx('growth-message')}>
              {growth === 1 && '성장이 불타는 중!'}
              {growth === -1 && '성장이 얼어가는 중...'}
              {growth === 0 && '스퍼트를 내볼 차례!'}
            </div>
            <div className={cx('level')}>
              {StatusIcon && <StatusIcon className={cx('icon')} />}
              <span>Lv. {level} </span>
              <span className={cx('level-max')}>/99</span>
            </div>
          </div>
          <div className={cx('xp-bar')}>
            <div
              className={cx('filled')}
              style={
                {
                  '--xp-width': `${(value * 100) / fullXp}%`,
                } as React.CSSProperties
              }
            />
          </div>
          <div className={cx('xp-remaining')}>(레벨업까지 +{xpLeft}xp)</div>
        </div>
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button variant="tertiary" onClick={onClose}>
          닫기
        </Button>
      </BottomSheet.Footer>
    </BottomSheet>
  );
};
