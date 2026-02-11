import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const ScrollProgressBar = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent2 to-accent3 z-40" style={{
      width: `${progress}%`,
      transition: progress === 100 ? 'width 0.3s ease-out' : 'width 0.1s linear',
      boxShadow: `0 0 20px rgba(0, 224, 255, ${progress / 100 * 0.8})`
    }} />
  );
};

export default ScrollProgressBar;
