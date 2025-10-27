import { BottomSheet } from '@/shared/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/shared/ui/button/button';
import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';
// import BurningSVG from '@/assets/icons/icon-burning.svg?react';
// import StagnationSVG from '@/assets/icons/icon-stagnation.svg?react';
// import { useGetUserAttributes } from '@/entities/attribute/api/useGetUserAttributes';

import classNames from 'classnames/bind';
import styles from './status-bottom-sheet.module.scss';
import type { Attribute } from '@/shared/model/attribute';
const cx = classNames.bind(styles);

type StatusDetailBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  statusKey: number;
  attribute: Attribute;
};

export const StatusDetailBottomSheet = ({
  isOpen,
  onClose,
  statusKey,
  attribute,
}: StatusDetailBottomSheetProps) => {
  const { name, description, level, exp, expToNextLevel } = attribute;
  const growth = 0;
  // const StatusIcon = growth === 1 ? BurningSVG : growth === -1 ? StagnationSVG : null;

  // 서버에서 해당 속성 정보 찾기
  // const attributeInfo = attributeDatas?.find(attr => attr.attributeId === statusKey);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <BottomSheet.Header>
        <BottomSheet.Title>
          <div className={cx('status-title')}>
            <AttributeIcon id={statusKey} />[{name || '알 수 없음'}] 능력치
          </div>
        </BottomSheet.Title>
        <BottomSheet.Description>
          {description || '설명을 불러올 수 없습니다.'}
        </BottomSheet.Description>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <div className={cx('status-detail')}>
          <div className={cx('status-text')}>
            <div className={cx('growth-message')}>
              {/* {growth === 1 && '성장이 불타는 중!'}
              {growth === -1 && '성장이 얼어가는 중...'} */}
              {growth === 0 && '스퍼트를 내볼 차례!'}
            </div>
            <div className={cx('level')}>
              {/* {StatusIcon && <StatusIcon className={cx('icon')} />} */}
              <span>Lv. {level} </span>
              <span className={cx('level-max')}>/99</span>
            </div>
          </div>
          <div className={cx('xp-bar')}>
            <div
              className={cx('filled')}
              style={
                {
                  '--xp-width': `${(exp * 100) / (expToNextLevel + exp)}%`,
                } as React.CSSProperties
              }
            />
          </div>
          <div className={cx('xp-remaining')}>
            (레벨업까지 +{expToNextLevel}xp)
          </div>
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
