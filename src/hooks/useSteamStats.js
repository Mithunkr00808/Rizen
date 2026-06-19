import { useState, useEffect } from 'react';

export default function useSteamStats() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fallback to the ID you provided if not in .env
        const steamId = import.meta.env.VITE_STEAM_ID || '76561199248457866';
        
        // This hits the Vite proxy which attaches your API key securely
        const response = await fetch(`/api/steam/IPlayerService/GetRecentlyPlayedGames/v0001/?steamid=${steamId}&format=json`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch Steam data');
        }

        const data = await response.json();
        
        if (data.response && data.response.games) {
          // Map the raw Steam API data into our generic format
          const mappedGames = data.response.games.map(game => ({
            title: game.name,
            playtime_2weeks: Math.round(game.playtime_2weeks / 60), // Convert minutes to hours
            playtime_forever: Math.round(game.playtime_forever / 60),
            icon: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
          }));
          
          setGames(mappedGames.slice(0, 3)); // Only take top 3 recently played
        } else {
          setGames([]);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { games, isLoading, error };
}
