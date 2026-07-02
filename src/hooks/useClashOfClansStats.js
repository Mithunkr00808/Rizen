import { useState, useEffect } from 'react';

export default function useClashOfClansStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      // The user will set these in their .env.local file
      const apiKey = import.meta.env.VITE_COC_API_KEY;
      const playerTag = import.meta.env.VITE_COC_PLAYER_TAG;

      if (!apiKey || !playerTag) {
        setIsLoading(false);
        setError("API Key or Player Tag missing in .env.local");
        return;
      }

      // The CoC API expects the # to be URL encoded as %23
      const formattedTag = playerTag.replace('#', '%23');
      
      try {
        // We use RoyaleAPI's proxy to bypass the strict IP Whitelisting requirements of the official API
        const response = await fetch(`https://cocproxy.royaleapi.dev/v1/players/${formattedTag}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch CoC data: ${response.status}`);
        }

        const data = await response.json();
        
        // Map the API response to our component's expected format
        setStats({
          playerName: data.name,
          playerTag: data.tag,
          townHall: data.townHallLevel,
          trophies: data.trophies,
          clanName: data.clan ? data.clan.name : 'No Clan',
          clanBadge: data.clan && data.clan.badgeUrls ? data.clan.badgeUrls.small : null,
          warStars: data.warStars,
          experienceLevel: data.expLevel,
          bestTrophies: data.bestTrophies,
          highestLeagueIcon: data.bestTrophies >= 5000 ? 'https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png' : null,
          attackWins: data.attackWins,
          role: data.role ? data.role.replace('coLeader', 'Co-Leader').replace('admin', 'Elder').replace('leader', 'Leader').replace('member', 'Member') : ''
        });
      } catch (err) {
        console.error("CoC API Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}
