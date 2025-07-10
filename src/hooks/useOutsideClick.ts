import { useEffect, useRef } from 'react';

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;

      if (!(event.target instanceof Node)) {
        return;
      }

      if (ref.current.contains(event.target)) {
        return;
      }

      /**
       * [TODO] 근본 원인 찾아보기 portal 렌더링 순서 이슈?
       */
      setTimeout(() => {
        callbackRef.current();
      }, 100);
    };

    document.addEventListener('mouseup', handleClick);
    document.addEventListener('touchend', handleClick);

    return () => {
      document.removeEventListener('mouseup', handleClick);
      document.removeEventListener('touchend', handleClick);
    };
  }, [ref]);
};
