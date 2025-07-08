import { useEffect, useRef } from 'react';

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  const containerRef = useRef(callback);

  useEffect(() => {
    containerRef.current = callback;
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

      containerRef.current();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref]);
};
