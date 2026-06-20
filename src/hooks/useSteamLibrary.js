import { useState, useEffect } from 'react';
import steamData from '../data/steam.json';

export default function useSteamLibrary() {
  const [library, setLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate a tiny delay for smooth UI transition
    const timer = setTimeout(() => {
      try {
        const enhancedData = steamData.map(game => ({
          ...game,
          icon: game.appid ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_600x900.jpg` : game.icon,
          fallbackIcon: game.appid ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg` : game.icon
        }));
        setLibrary(enhancedData);
      } catch (err) {
        console.error("Failed to load static steam data", err);
        setError("Failed to load local Steam data.");
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { library, isLoading, error };
}
