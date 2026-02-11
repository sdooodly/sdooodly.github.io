import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    setIsMounted(true);

    const html = document.documentElement;
    if (savedTheme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);

      const html = document.documentElement;
      if (newTheme === 'light') {
        html.classList.add('light');
        html.classList.remove('dark');
      } else {
        html.classList.add('dark');
        html.classList.remove('light');
      }

      return newTheme;
    });
  }, []);

  return { theme, toggleTheme, isMounted };
};
