import { useState, useEffect } from 'react';
import xboxData from '../data/xbox.json';

export default function useXboxLibrary() {
  const [library, setLibrary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate a tiny delay for smooth UI transition
    const timer = setTimeout(() => {
      try {
        const enhancedData = {
          ...xboxData,
          recentGames: xboxData.recentGames.map(game => ({
            ...game,
            coverUrl: game.coverUrl ? game.coverUrl.replace('&w=512&h=512', '&w=1024&h=1024') : null
          }))
        };
        setLibrary(enhancedData);
      } catch (err) {
        console.error("Failed to load static xbox data", err);
        setError("Failed to load local Xbox data.");
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { library, isLoading, error };
}
