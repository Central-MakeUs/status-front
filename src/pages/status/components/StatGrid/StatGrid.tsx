import classNames from 'classnames/bind';
import styles from './StatGrid.module.scss';
import EmpathyCommunicationSVG from '@/assets/icons/ability/icon-empathy-communication.svg?react';
import HeraldrySVG from '@/assets/icons/ability/icon-heraldry.svg?react';
import LearningFocusSVG from '@/assets/icons/ability/icon-learning-focus.svg?react';
import PhysicalTrainingSVG from '@/assets/icons/ability/icon-physical-training.svg?react';
import TechnologyApplicationSVG from '@/assets/icons/ability/icon-technology-application.svg?react';
import CreativeTechSVG from '@/assets/icons/ability/icon-creative-tech.svg?react';
import WillPowerSVG from '@/assets/icons/ability/icon-willpower.svg?react';
import SelfControlSVG from '@/assets/icons/ability/icon-self-control.svg?react';
import SinceritySVG from '@/assets/icons/ability/icon-sincerity.svg?react';
import BoldnessSVG from '@/assets/icons/ability/icon-boldness.svg?react';
import ConcentrationSVG from '@/assets/icons/ability/icon-concentration.svg?react';
import CreativitySVG from '@/assets/icons/ability/icon-creativity.svg?react';
import BurningSVG from '@/assets/icons/icon-burning.svg?react';
import StagnationSVG from '@/assets/icons/icon-stagnation.svg?react';
const cx = classNames.bind(styles);

interface StatGridProps {
  mentalData: number[];
  skillData: number[];
  isMental: boolean;
  growthStatusList: number[][];
}

export const StatGrid = ({
  mentalData,
  skillData,
  isMental,
  growthStatusList,
}: StatGridProps) => {
  // const growthStatusList = [1, 0, 0, -1, 0, 0];

  return (
    <div className={cx('main')}>
      <div className={cx('grid')}>
        {(isMental
          ? [
              { label: '의지력', Icon: WillPowerSVG, index: 0 },
              { label: '집중력', Icon: ConcentrationSVG, index: 1 },
              { label: '자기 통제력', Icon: SelfControlSVG, index: 2 },
              { label: '창의성', Icon: CreativitySVG, index: 3 },
              { label: '성실성', Icon: SinceritySVG, index: 4 },
              { label: '대담성', Icon: BoldnessSVG, index: 5 },
            ]
          : [
              { label: '문장술', Icon: HeraldrySVG, index: 0 },
              { label: '창조기술', Icon: CreativeTechSVG, index: 1 },
              { label: '학습 집중', Icon: LearningFocusSVG, index: 2 },
              { label: '신체 수련', Icon: PhysicalTrainingSVG, index: 3 },
              { label: '기술 응용', Icon: TechnologyApplicationSVG, index: 4 },
              { label: '공감 소통', Icon: EmpathyCommunicationSVG, index: 5 },
            ]
        ).map(({ label, Icon, index }) => {
          const value = isMental ? mentalData[index] : skillData[index];
          const status = growthStatusList[isMental ? 0 : 1][index];
          const StatusIcon =
            status === 1 ? BurningSVG : status === -1 ? StagnationSVG : null;

          return (
            <div className={cx('card')}>
              <div className={cx('left')}>
                <Icon />
                <span className={cx('label')}>{label}</span>
              </div>
              <div className={cx('right')}>
                {StatusIcon && <StatusIcon className={cx('icon')} />}
                <span className={cx('value')}>{value}/100</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
