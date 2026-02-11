import { useState, useEffect } from 'react';

export const useCounterAnimation = (target, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      startValue += increment;
      
      if (startValue >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(startValue));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
};
