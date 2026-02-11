import { useState, useEffect } from 'react';

/**
 * Custom hook to detect media queries and respond to window resizing
 * @param {string} query - Media query string (e.g., '(max-width: 640px)')
 * @returns {boolean} - Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create listener
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query, matches]);

  return matches;
};

/**
 * @returns {boolean} - True if viewport is 640px or smaller
 */
export const useIsMobile = () => useMediaQuery('(max-width: 640px)');
