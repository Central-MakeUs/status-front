import { useEffect } from 'react';

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;

      if (!(event.target instanceof Node)) {
        return;
      }

      if (ref.current.contains(event.target)) {
        return;
      }

      callback();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
};
