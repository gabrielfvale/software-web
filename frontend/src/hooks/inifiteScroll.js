import { useCallback, useRef, useEffect } from 'react';

export const useInfiniteScroll = (callbackParam, busy) => {
  const observer = useRef(null);

  const callback = useCallback(
    entries => {
      if (entries.length === 0) {
        return;
      }

      if (entries[0].isIntersecting && !busy) {
        callbackParam();
      }
    },
    [callbackParam, busy]
  );

  const infiniteScrollRef = useCallback(
    node => {
      if (!node) {
        return;
      }

      observer.current?.disconnect();

      observer.current = new IntersectionObserver(callback);
      observer.current.observe(node);
    },
    [callback]
  );
  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  return infiniteScrollRef;
};
