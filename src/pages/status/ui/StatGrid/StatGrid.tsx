import classNames from 'classnames/bind';
import styles from './StatGrid.module.scss';
// import BurningSVG from '@/assets/icons/icon-burning.svg?react';
// import StagnationSVG from '@/assets/icons/icon-stagnation.svg?react';
import { AttributeIcon } from '@/shared/ui/AttributeIcon/AttributeIcon';
import type { Attribute } from '@/entities/users-attribute/model/types';
const cx = classNames.bind(styles);

interface StatGridProps {
  data: Attribute[];
  onClick: (key: number) => void;
}

export const StatGrid = ({ data, onClick }: StatGridProps) => {
  return (
    <div className={cx('main')}>
      <div className={cx('grid')}>
        {data.map((attr) => {
          const Icon = <AttributeIcon id={attr.attributeId} />;
          const xpLeft = attr.expToNextLevel
            ? attr.expToNextLevel
            : 100 - attr.level;
          // const status = attr.status;
          // const StatusIcon = status === 1 ? BurningSVG : status === -1 ? StagnationSVG : null;

          return (
            <button
              type="button"
              className={cx('card')}
              onClick={() => onClick(attr.attributeId)}
              key={attr.attributeId}
            >
              <div className={cx('left')}>{Icon}</div>
              <div className={cx('center')}>
                <span className={cx('label')}>{attr.name}</span>
                <div className={cx('level')}>
                  {/* {StatusIcon && <StatusIcon className={cx('icon')} />}*/}
                  Lv. {attr.level}
                </div>
              </div>
              <div className={cx('xp-left')}>(레벨업까지 +{xpLeft}xp)</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
