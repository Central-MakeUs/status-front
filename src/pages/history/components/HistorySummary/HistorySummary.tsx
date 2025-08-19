import classNames from 'classnames/bind';
import styles from './HistorySummary.module.scss';
import { useId, useMemo } from 'react';

const cx = classNames.bind(styles);

interface HistorySummaryProps {
  totalMainQuests: number;
  totalSubQuestVerifications: number;
  averageCompletionRate: number;
  averageDurationDays: number;
}

export const HistorySummary = ({
  totalMainQuests,
  totalSubQuestVerifications,
  averageCompletionRate,
  averageDurationDays,
}: HistorySummaryProps) => {
  const progressBarLabelId = useId();

  const progressBar = useMemo(() => {
    const radius = 25;
    const strokeWidth = 3;
    const strokeDasharray = 2 * Math.PI * radius;
    const strokeDashoffset =
      strokeDasharray * (1 - averageCompletionRate / 100);

    return {
      radius,
      strokeWidth,
      strokeDasharray,
      strokeDashoffset,
    };
  }, [averageCompletionRate]);

  return (
    <div className={cx('history-summary')}>
      <h3 className={cx('summary-title')}>누적 기록 리포트</h3>

      <ul className={cx('summary-list')}>
        <li className={cx('summary-item')}>
          <strong className={cx('summary-label')}>완료한 총 메인퀘스트</strong>
          <span className={cx('summary-count')}>
            <strong className={cx('count')}>{totalMainQuests}</strong>
            <span className={cx('unit')}>개</span>
          </span>
        </li>
        <li className={cx('summary-item', 'progress')}>
          <strong className={cx('summary-label')} id={progressBarLabelId}>
            퀘스트
            <br />
            완료율
          </strong>
          <div
            role="progressbar"
            aria-valuenow={averageCompletionRate}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-labelledby={progressBarLabelId}
            className={cx('progress-bar')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              className={cx('progress-svg')}
              aria-hidden="true"
            >
              <circle
                className={cx('frame')}
                cx="27"
                cy="27"
                r={progressBar.radius}
                fill="none"
                stroke-width={progressBar.strokeWidth}
              />
              <circle
                className={cx('bar')}
                cx="27"
                cy="27"
                r={progressBar.radius}
                fill="none"
                stroke-width={progressBar.strokeWidth}
                stroke-linecap="round"
                stroke-dasharray={`${progressBar.strokeDasharray}px`}
                stroke-dashoffset={`${progressBar.strokeDashoffset}px`}
              />
            </svg>
            <span className={cx('progress-text')}>
              {averageCompletionRate}%
            </span>
          </div>
        </li>
        <li className={cx('summary-item')}>
          <strong className={cx('summary-label')}>서브퀘스트 인증 횟수</strong>
          <span className={cx('summary-count')}>
            <strong className={cx('count')}>
              {totalSubQuestVerifications}
            </strong>
            <span className={cx('unit')}>회</span>
          </span>
        </li>
        <li className={cx('summary-item')}>
          <strong className={cx('summary-label')}>평균 퀘스트 수행 기간</strong>
          <span className={cx('summary-count')}>
            <strong className={cx('count')}>{averageDurationDays}</strong>
            <span className={cx('unit')}>일</span>
          </span>
        </li>
      </ul>
    </div>
  );
};
