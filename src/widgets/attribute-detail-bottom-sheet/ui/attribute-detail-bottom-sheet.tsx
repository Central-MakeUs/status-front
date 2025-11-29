import { BottomSheet } from '@/shared/ui/bottom-sheet/bottom-sheet';
import { Button } from '@/shared/ui/button/button';
import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';
import type { UserAttribute } from '@/entities/user-quest/model/user-quest';

import classNames from 'classnames/bind';
import styles from './attribute-detail-bottom-sheet.module.scss';
const cx = classNames.bind(styles);

interface AttributeDetailBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAttribute: UserAttribute;
}

export const AttributeDetailBottomSheet = ({
  isOpen,
  onClose,
  selectedAttribute,
}: AttributeDetailBottomSheetProps) => {
  const { attributeId, name, description, level, exp, expToNextLevel } =
    selectedAttribute;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <BottomSheet.Header>
        <BottomSheet.Title>
          <div className={cx('status-title')}>
            <AttributeIcon id={attributeId} />[{name ?? '알 수 없음'}] 능력치
          </div>
        </BottomSheet.Title>
        <BottomSheet.Description>
          {description || '설명을 불러올 수 없습니다.'}
        </BottomSheet.Description>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <div className={cx('status-detail')}>
          <div className={cx('status-text')}>
            <div className={cx('growth-message')}>스퍼트를 내볼 차례!</div>
            <div className={cx('level')}>
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
