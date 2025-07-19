import classNames from 'classnames/bind';
import styles from './StatGrid.module.scss';
import BurningSVG from '@/assets/icons/icon-burning.svg?react';
import StagnationSVG from '@/assets/icons/icon-stagnation.svg?react';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
const cx = classNames.bind(styles);

interface StatGridProps {
  mentalData: number[];
  skillData: number[];
  isMental: boolean;
  growthStatusList: number[][];
  levelList: number[][];
  // xpLeftList: number[][];
}

export const StatGrid = ({
  mentalData,
  skillData,
  isMental,
  growthStatusList,
  levelList,
  // xpLeftList,
}: StatGridProps) => {
  // const growthStatusList = [1, 0, 0, -1, 0, 0];

  return (
    <div className={cx('main')}>
      <div className={cx('grid')}>
        {(isMental
          ? [
              { label: '인내', Icon: <AttributeIcon id={101} />, index: 0 },
              { label: '집중', Icon: <AttributeIcon id={102} />, index: 1 },
              { label: '제어', Icon: <AttributeIcon id={103} />, index: 2 },
              { label: '영감', Icon: <AttributeIcon id={104} />, index: 3 },
              { label: '성실', Icon: <AttributeIcon id={105} />, index: 4 },
              { label: '용기', Icon: <AttributeIcon id={106} />, index: 5 },
            ]
          : [
              { label: '건강', Icon: <AttributeIcon id={201} />, index: 0 },
              { label: '전략', Icon: <AttributeIcon id={202} />, index: 1 },
              { label: '기록', Icon: <AttributeIcon id={203} />, index: 2 },
              { label: '기술', Icon: <AttributeIcon id={204} />, index: 3 },
              { label: '화술', Icon: <AttributeIcon id={205} />, index: 4 },
              { label: '탐구', Icon: <AttributeIcon id={206} />, index: 5 },
            ]
        ).map(({ label, Icon, index }) => {
          const level = isMental ? levelList[0][index] : levelList[1][index];
          const xpLeft =
            100 - (isMental ? mentalData[index] : skillData[index]);
          const status = growthStatusList[isMental ? 0 : 1][index];
          const StatusIcon =
            status === 1 ? BurningSVG : status === -1 ? StagnationSVG : null;

          return (
            <div className={cx('card')}>
              <div className={cx('left')}>{Icon}</div>
              <div className={cx('center')}>
                <span className={cx('label')}>{label}</span>
                <div className={cx('level')}>
                  {StatusIcon && <StatusIcon className={cx('icon')} />}Lv.{' '}
                  {level}
                </div>
              </div>
              <div className={cx('xpLeft')}>(레벨업까지 +{xpLeft}xp)</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
