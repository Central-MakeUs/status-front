import { Link, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import IconStatus from '@/assets/icons/icon-menu-status.svg?react';
import IconChallenge from '@/assets/icons/icon-menu-challenge.svg?react';
import IconHistory from '@/assets/icons/icon-menu-history.svg?react';
import IconProfile from '@/assets/icons/icon-menu-profile.svg?react';

import classNames from 'classnames/bind';
import styles from './BottomNavigation.module.scss';

const cx = classNames.bind(styles);

interface BottomNavigationTab {
  label: string;
  path: (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const BottomNavigation = () => {
  const location = useLocation();

  const tabs: BottomNavigationTab[] = [
    {
      label: '상태창',
      path: PAGE_PATHS.STATUS,
      icon: IconStatus,
    },
    {
      label: '목표&챌린지',
      path: PAGE_PATHS.CHALLENGE,
      icon: IconChallenge,
    },
    {
      label: '히스토리',
      path: PAGE_PATHS.HISTORY,
      icon: IconHistory,
    },
    {
      label: '마이페이지',
      path: PAGE_PATHS.PROFILE,
      icon: IconProfile,
    },
  ];

  return (
    <footer className={cx('bottom-navigation')}>
      <nav>
        <ul className={cx('tab-list')}>
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={cx('tab-item')}
              aria-current={location.pathname === tab.path ? 'page' : undefined}
            >
              <Link to={tab.path} className={cx('tab-link')}>
                <tab.icon className={cx('tab-icon')} aria-hidden="true" />
                <span className="sr-only">{tab.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
