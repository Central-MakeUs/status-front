import EmpathyCommunicationSVG from '@/assets/ability/empathyCommunication.svg?url';
import HeraldrySVG from '@/assets/ability/heraldry.svg?url';
import LearningFocusSVG from '@/assets/ability/learningFocus.svg?url';
import PhysicalTrainingSVG from '@/assets/ability/physicalTraining.svg?url';
import TechnologyApplicationSVG from '@/assets/ability/technologyApplication.svg?url';
import CreativeTechSVG from '@/assets/ability/creativeTech.svg?url';
import WillPowerSVG from '@/assets/ability/willpower.svg?url';
import SelfControlSVG from '@/assets/ability/selfcontrol.svg?url';
import SinceritySVG from '@/assets/ability/sincerity.svg?url';
import BoldnessSVG from '@/assets/ability/boldness.svg?url';
import ConcentrationSVG from '@/assets/ability/concentration.svg?url';
import CreativitySVG from '@/assets/ability/creativity.svg?url';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

import classNames from 'classnames/bind';
import styles from './RadarChart.module.scss';
import { useState, useMemo } from 'react';

const cx = classNames.bind(styles);
interface RadarChartProps {
  mentalData: number[];
  skillData: number[];
  profileImage: string;
}

export const RadarChart = ({
  mentalData,
  skillData,
  profileImage,
}: RadarChartProps) => {
  const [view, setView] = useState<'정신' | '기술'>('정신');
  const img = new Image();
  img.src = profileImage;

  const isMental = view === '정신';
  const labels = ['', '', '', '', '', ''];

  const iconImages = useMemo(() => {
    const sources = isMental
      ? [
          WillPowerSVG,
          ConcentrationSVG,
          SelfControlSVG,
          CreativitySVG,
          SinceritySVG,
          BoldnessSVG,
        ]
      : [
          HeraldrySVG,
          CreativeTechSVG,
          LearningFocusSVG,
          PhysicalTrainingSVG,
          TechnologyApplicationSVG,
          EmpathyCommunicationSVG,
        ];

    return sources.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, [isMental]);

  const borderColor = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return isMental ? '#ffe100' : '#91caff'; // fallback

    const gradient = ctx.createLinearGradient(0, 0, 300, 0);
    if (isMental) {
      gradient.addColorStop(0, '#FF2C7A');
      gradient.addColorStop(0.2352, '#FF4A33');
      gradient.addColorStop(0.6551, '#FFE100');
      gradient.addColorStop(1, '#FFFFFF');
    } else {
      gradient.addColorStop(0, '#D8F5FF');
      gradient.addColorStop(0.5578, '#0084FF');
      gradient.addColorStop(1, '#7500E9');
    }
    return gradient;
  }, [isMental]);

  const data = {
    labels,
    datasets: [
      {
        label: `${view} 상태`,
        data: isMental ? mentalData : skillData,
        backgroundColor: isMental
          ? 'rgba(255, 74, 51, 0.10)'
          : 'rgba(145, 202, 255, 0.10)',
        borderColor,
      },
      {
        label: `비선택 상태`,
        data: isMental ? skillData : mentalData,
        backgroundColor: 'rgba(70, 70, 70, 0.3)',
        borderColor: 'rgba(153, 153, 153, 0.3)',
      },
    ],
  };

  const iconLabelPlugin = {
    id: 'iconLabelPlugin',
    afterDraw(chart: Chart<'radar'>) {
      const { ctx, chartArea, scales } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const radius = (scales.r as RadialLinearScale & { drawingArea: number })
        .drawingArea;

      iconImages.forEach((img, i) => {
        const angle = ((Math.PI * 2) / iconImages.length) * i - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle) - 18;
        const y = centerY + radius * Math.sin(angle) - 18;

        ctx.drawImage(img, x, y, 36, 36);
      });

      ctx.drawImage(img, centerX - 45 / 2, centerY - 45 / 2, 45, 45);
    },
  };

  const radarBackgroundPlugin = {
    id: 'radarBackgroundPlugin',
    beforeDraw(chart: Chart<'radar'>) {
      const { ctx, chartArea, scales } = chart;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const radius = (scales.r as RadialLinearScale & { drawingArea: number })
        .drawingArea;

      ctx.save();
      ctx.fillStyle = '#212121';

      const pointCount = chart.data.labels!.length;
      const angleStep = (Math.PI * 2) / pointCount;

      ctx.beginPath();
      for (let i = 0; i < pointCount; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },
  };

  return (
    <div className={cx('radarChartWrapper')}>
      <div className={cx('toggleTabs', { skill: !isMental })}>
        <button
          className={cx('tab', { active: isMental })}
          onClick={() => setView('정신')}
          data-view="정신"
        >
          정신
        </button>
        <button
          className={cx('tab', { active: !isMental })}
          onClick={() => setView('기술')}
          data-view="기술"
        >
          기술
        </button>
      </div>
      <div className={cx('chartArea')}>
        <Radar
          key={isMental ? 'mental' : 'skill'}
          data={data}
          options={{
            layout: {
              padding: 8,
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                max: 100,
                min: 0,
                angleLines: { color: '#2D2D2D' },
                grid: {
                  color: '#2D2D2D',
                  circular: false,
                },
                ticks: {
                  display: false,
                  backdropColor: '#212121',
                  color: '#999',
                  stepSize: 25,
                },
              },
            },
            elements: {
              point: {
                radius: 0,
                hoverRadius: 0,
              },
              line: {
                tension: 0.05, // 이 값으로 라운딩 정도 조절 가능 (0 ~ 1)
                borderCapStyle: 'round', // 끝점 라운드 처리
              },
            },
            plugins: {
              legend: { display: false },
            },
          }}
          plugins={[radarBackgroundPlugin, iconLabelPlugin]}
        />
      </div>
    </div>
  );
};
