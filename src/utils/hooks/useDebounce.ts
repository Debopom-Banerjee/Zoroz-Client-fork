import { useState, useEffect } from 'react';

const useDebounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  const [debouncedFunction, setDebouncedFunction] = useState<F | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFunction(func);
    }, delay);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [func, delay]);

  return debouncedFunction as F;
};

export default useDebounce;
