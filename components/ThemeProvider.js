import { useEffect } from 'react';

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Set initial theme
    updateTheme();

    // Listen for changes
    mediaQuery.addEventListener('change', updateTheme);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);

  return children;
}