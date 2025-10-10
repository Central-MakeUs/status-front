import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { TUTORIAL_STEPS } from '@/constants/tutorial';
import type { TutorialStep } from '@/types/tutorial';

import IconLogoWhite from '@/assets/icons/icon-logo-white.svg?react';

import classNames from 'classnames/bind';
import styles from './TutorialPage.module.scss';

const cx = classNames.bind(styles);

const TutorialPage = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<TutorialStep>(
    TUTORIAL_STEPS.FIRST
  );

  const handleNextStep = () => {
    if (currentStep === TUTORIAL_STEPS.THIRD) {
      navigate(PAGE_PATHS.ROOT);
      return;
    }

    setCurrentStep((prev) =>
      prev === TUTORIAL_STEPS.FIRST
        ? TUTORIAL_STEPS.SECOND
        : TUTORIAL_STEPS.THIRD
    );
  };

  return (
    <>
      <header className={cx('tutorial-header')}>
        <h2 className={cx('tutorial-title')}>
          <IconLogoWhite className={cx('icon-logo')} />
          <span className="sr-only">튜토리얼 페이지</span>
        </h2>
      </header>
      <main className="main">
        <div className={cx('tutorial')}>
          <h3 className={cx('tutorial-sub-title')}>{currentStep.title}</h3>
          <p className={cx('tutorial-description')}>
            {currentStep.description}
          </p>
          <div className={cx('tutorial-animation-wrapper')}>
            <video
              key={currentStep.path}
              className={cx('tutorial-animation')}
              autoPlay
              muted
              playsInline
            >
              <source src={`${currentStep.path}`} type="video/mp4" />
            </video>
          </div>
        </div>
      </main>
      <footer className={cx('tutorial-footer')}>
        <Button variant="secondary" onClick={handleNextStep}>
          {currentStep === TUTORIAL_STEPS.THIRD ? '시작하기' : '다음'}
        </Button>
      </footer>
    </>
  );
};

export default TutorialPage;
