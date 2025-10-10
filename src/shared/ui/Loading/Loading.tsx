import { createPortal } from 'react-dom';
import { LoadingContainer } from './LoadingContainer';
import LoadingImageUrl from '@/assets/images/image-loading.gif';

import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

export const Loading = () => {
  return createPortal(
    <LoadingContainer>
      <div className={cx('loading')}>
        <img
          className={cx('loading-image')}
          width={112}
          height={112}
          src={LoadingImageUrl}
          alt=""
        />
        <span className={cx('loading-text')}>로딩 중...</span>
      </div>
    </LoadingContainer>,
    document.getElementById('modal-root') as HTMLElement
  );
};
