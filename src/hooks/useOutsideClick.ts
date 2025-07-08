import { useEffect, useRef } from 'react';

export const useOutSideClick = (
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

      if (ref.current.contains(event.target as Node)) {
        return;
      }

      containerRef.current();
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref]);
};
