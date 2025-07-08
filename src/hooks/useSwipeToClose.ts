import { useState, useCallback } from 'react';

interface UseSwipeToCloseOptions {
  ref: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  threshold?: number;
  velocityThreshold?: number;
}

/**
 * @param ref - 대상 요소의 ref
 * @param onClose - 닫기 함수
 * @param threshold - 닫기 임계값 (px)
 * @param velocityThreshold - 속도 임계값 (px/ms)
 */
export const useSwipeToClose = ({
  ref,
  onClose,
  threshold = 100,
  velocityThreshold = 0.3,
}: UseSwipeToCloseOptions) => {
  const [dragState, setDragState] = useState({
    isDragging: false,
    startY: 0,
    currentY: 0,
    startTime: 0,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    setDragState({
      isDragging: true,
      startY: touch.clientY,
      currentY: touch.clientY,
      startTime: performance.now(),
    });
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (!dragState.isDragging || !ref.current) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - dragState.startY;

      if (deltaY > 0) {
        setDragState((prev) => ({ ...prev, currentY: touch.clientY }));

        ref.current.style.transform = `translateY(${deltaY}px)`;
      }
    },
    [dragState, ref]
  );

  const handleTouchEnd = useCallback(() => {
    if (!dragState.isDragging || !ref.current) return;

    const deltaY = dragState.currentY - dragState.startY;
    const deltaTime = performance.now() - dragState.startTime;
    const velocity = deltaY / deltaTime;

    const shouldClose =
      deltaY > threshold || (velocity > velocityThreshold && deltaY > 50);

    if (shouldClose) {
      ref.current.style.transform = 'translateY(100%)';
      setTimeout(onClose, 300);
    } else {
      ref.current.style.transform = 'translateY(0)';
    }

    setDragState({ isDragging: false, startY: 0, currentY: 0, startTime: 0 });
  }, [dragState, onClose, threshold, velocityThreshold, ref]);

  const swipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTransitionEnd: () => {
      if (ref.current) {
        ref.current.style.transition = '';
      }
    },
  };

  return { swipeHandlers };
};
