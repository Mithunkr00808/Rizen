import { useState, useEffect } from 'react';

export default function useClashOfClansStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Single dedicated endpoint - works on both local (Vite proxy) and Vercel (serverless)
        const response = await fetch(`/api/coc-player`, {
          headers: { 'Accept': 'application/json' }
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
