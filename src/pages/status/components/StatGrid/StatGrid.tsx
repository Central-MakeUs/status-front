import classNames from 'classnames/bind';
import styles from './StatGrid.module.scss';
import BurningSVG from '@/assets/icons/icon-burning.svg?react';
import StagnationSVG from '@/assets/icons/icon-stagnation.svg?react';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
import { ATTRIBUTE_TEXTS, attributeDatas } from '@/constants/attribute';
import type { AttributeStatus } from '@/api/types/status';
const cx = classNames.bind(styles);

interface StatGridProps {
  mentalData: AttributeStatus[];
  skillData: AttributeStatus[];
  isMental: boolean;
  // xpLeftList: number[][];
  onClick: (event: React.MouseEvent, key: number) => void;
}

export const StatGrid = ({
  mentalData,
  skillData,
  isMental,
  // growthStatusList,
  // levelList,
  // xpLeftList,
  onClick,
}: StatGridProps) => {
  const dataIndex = isMental ? 0 : 1;

  return (
    <div className={cx('main')}>
      <div className={cx('grid')}>
        {attributeDatas[dataIndex].map((attrId, index) => {
          const label = ATTRIBUTE_TEXTS[attrId as keyof typeof ATTRIBUTE_TEXTS];
          const Icon = <AttributeIcon id={attrId} />;
          const level = isMental
            ? mentalData[index].level
            : skillData[index].level;
          const xpLeft =
            100 - (isMental ? mentalData[index].value : skillData[index].value);
          const status = isMental
            ? mentalData[index].growth
            : skillData[index].growth;
          const StatusIcon =
            status === 1 ? BurningSVG : status === -1 ? StagnationSVG : null;

          return (
            <div
              className={cx('card')}
              onClick={(event) => onClick(event, attrId)}
              key={attrId}
            >
              <div className={cx('left')}>{Icon}</div>
              <div className={cx('center')}>
                <span className={cx('label')}>{label}</span>
                <div className={cx('level')}>
                  {StatusIcon && <StatusIcon className={cx('icon')} />}Lv.{' '}
                  {level}
                </div>
              </div>
              <div className={cx('xp-left')}>(레벨업까지 +{xpLeft}xp)</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
