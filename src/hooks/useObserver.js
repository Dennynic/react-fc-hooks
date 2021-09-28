import { useEffect, useRef } from 'react';
export const useObserver = (ref, canLoad, isLoading, callBack) => {
  const observer = useRef();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    const observeCallback = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callBack();
      }
    };
    observer.current = new IntersectionObserver(observeCallback);
    observer.current.observe(ref.current);
  }, [isLoading]);
};
