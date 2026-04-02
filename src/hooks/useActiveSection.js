import { useState, useEffect, useRef } from 'react';

export const useActiveSection = (sectionIds = []) => {
  const [activeSection, setActiveSection] = useState('home');
  const sectionIdsRef = useRef(sectionIds);
  sectionIdsRef.current = sectionIds;

  useEffect(() => {
    const observers = [];
    const handleIntersect = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-40% 0px -60% 0px',
    });

    for (const id of sectionIdsRef.current) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push(el);
      }
    }

    return () => {
      for (const el of observers) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};
