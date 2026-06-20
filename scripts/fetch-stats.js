import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
config({ path: path.resolve(__dirname, '../.env.local') });

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const HENRIK_API_KEY = process.env.VITE_HENRIK_API_KEY;
const RIOT_ID = process.env.VITE_RIOT_ID?.replace(/["']/g, '');

const STEAM_ID = '76561199248457866'; // From previous resolution
const XBOX_GAMERTAG = 'CovertGosling64';

const dataDir = path.resolve(__dirname, '../src/data');

async function fetchXboxStats() {
  console.log('Fetching Xbox Profile...');
  const url = `https://xboxgamertag.com/search/${XBOX_GAMERTAG}`;
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    // Profile Details
    let avatarUrl = $('.avatar img').attr('src') || '';
    if (avatarUrl.startsWith('//')) avatarUrl = 'https:' + avatarUrl;

    let gamerscore = '0';
    let gamesPlayed = '0';
    $('.profile-detail-item').each((_, el) => {
      const text = $(el).text();
      if (text.includes('Gamerscore')) {
        gamerscore = text.replace('Gamerscore', '').trim();
      }
      if (text.includes('Games Played')) {
        gamesPlayed = text.replace('Games Played', '').trim();
      }
    });

    const recentGames = [];

    $('.recent-games .game-card').each((_, el) => {
      const card = $(el);
      
      const title = card.find('h3').text().trim();
      const lastPlayed = card.find('p.text-sm').text().replace('Last played ', '').trim();
      
      let coverStyle = card.find('.game-card-cover').attr('style') || '';
      let coverUrl = null;
      const match = coverStyle.match(/url\(['"]?(.*?)['"]?\)/);
      if (match && match[1]) {
        coverUrl = match[1];
        if (coverUrl.startsWith('//')) coverUrl = 'https:' + coverUrl;
      }

      let gameScore = '';
      let gameAch = '';

      card.find('.row').each((_, rowEl) => {
        const row = $(rowEl);
        const badge = row.find('.badge').text().trim();
        const val = row.find('.font-weight-bold').text().trim();
        if (badge === 'Gamerscore') gameScore = val;
        if (badge === 'Achievements') gameAch = val;
      });

      // Filter out zero progress games if desired, but we can just grab the top 10
      if (title) {
        recentGames.push({
          title,
          lastPlayed,
          coverUrl,
          gameScore,
          gameAch
        });
      }
    });

    const xboxData = {
      gamertag: XBOX_GAMERTAG,
      avatarUrl,
      gamerscore,
      gamesPlayed,
      recentGames // Get all scraped games instead of limiting to 8
    };

    fs.writeFileSync(path.join(dataDir, 'xbox.json'), JSON.stringify(xboxData, null, 2));
    console.log(`Saved Xbox stats for ${XBOX_GAMERTAG}.`);

  } catch (e) {
    console.error("Failed to fetch Xbox stats:", e);
  }
}

async function fetchSteamStats() {
  console.log('Fetching Steam Library...');
  if (!STEAM_API_KEY) throw new Error("STEAM_API_KEY is missing");

  const res = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json&include_appinfo=true&include_played_free_games=true`);
  const data = await res.json();

  if (!data.response || !data.response.games) {
    throw new Error('Failed to fetch Steam games.');
  }

  // Filter games with > 1 hour playtime and sort by playtime descending
  const topGames = data.response.games
    .filter(g => g.playtime_forever >= 60)
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .map(g => ({
      appid: g.appid,
      title: g.name,
      hours: Math.floor(g.playtime_forever / 60),
      icon: g.img_icon_url ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg` : null,
      achievements: [] // Will populate
    }));

  // Fetch Achievements for the Top Games
  console.log('Fetching Steam Achievements...');
  for (let game of topGames) {
    try {
      const achRes = await fetch(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${game.appid}&key=${STEAM_API_KEY}&steamid=${STEAM_ID}`);
      const achData = await achRes.json();
      
      if (achData.playerstats && achData.playerstats.success && achData.playerstats.achievements) {
        const unlocked = achData.playerstats.achievements.filter(a => a.achieved === 1);
        
        if (unlocked.length > 0) {
          // Fetch schema for images
          const schemaRes = await fetch(`http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${STEAM_API_KEY}&appid=${game.appid}`);
          const schemaData = await schemaRes.json();
          const schemaAch = schemaData.game.availableGameStats?.achievements || [];
          
          // Map unlocked to rich data and limit to 15
          game.achievements = unlocked.map(u => {
            const schema = schemaAch.find(s => s.name === u.apiname);
            return {
              name: schema?.displayName || u.apiname,
              icon: schema?.icon || null
            };
          }).filter(a => a.icon !== null).slice(0, 15);
        }
      }
    } catch (e) {
      // Game probably doesn't have achievements or profile is private for this game
    }
  }

  fs.writeFileSync(path.join(dataDir, 'steam.json'), JSON.stringify(topGames, null, 2));
  console.log(`Saved ${topGames.length} top Steam games.`);
}

async function fetchValorantStats() {
  console.log('Fetching Valorant Stats...');
  if (!HENRIK_API_KEY) throw new Error("VITE_HENRIK_API_KEY is missing");
  if (!RIOT_ID) throw new Error("VITE_RIOT_ID is missing");

  const [gameName, tagLine] = RIOT_ID.split('#');
  
  const headers = { 'Authorization': HENRIK_API_KEY };

  // 1. Fetch MMR Data (Current Rank & Peak Rank)
  console.log(`Fetching MMR for ${gameName}#${tagLine}...`);
  const mmrRes = await fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/ap/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`, { headers });
  if (!mmrRes.ok) throw new Error(`MMR API Error: ${mmrRes.status}`);
  const mmrData = await mmrRes.json();
  const mmr = mmrData.data;

  // 2. Fetch Lifetime Matches (for KD, Agent, and Hours)
  console.log(`Fetching Lifetime Matches...`);
  const matchesRes = await fetch(`https://api.henrikdev.xyz/valorant/v1/lifetime/matches/ap/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`, { headers });
  if (!matchesRes.ok) throw new Error(`Matches API Error: ${matchesRes.status}`);
  const matchesData = await matchesRes.json();
  const matches = matchesData.data;

  // Calculate stats from matches
  let totalKills = 0;
  let totalDeaths = 0;
  let totalMinutes = 0;
  const agentCounts = {};

  matches.forEach(match => {
    // Add KD
    totalKills += match.stats.kills;
    totalDeaths += match.stats.deaths;

    // Agent counts
    const agentName = match.stats.character.name;
    if (agentName) {
      agentCounts[agentName] = (agentCounts[agentName] || 0) + 1;
    }

    // Time calculation approximation
    // Standard unrated/comp ~35 mins, Deathmatch/Spike Rush ~10 mins
    const mode = match.meta.mode;
    if (mode === 'Deathmatch' || mode === 'Team Deathmatch' || mode === 'Spike Rush') {
      totalMinutes += 10;
    } else if (mode === 'Swiftplay') {
      totalMinutes += 15;
    } else {
      totalMinutes += 35; // Competitive / Unrated
    }
  });

  const kdRatio = totalDeaths > 0 ? (totalKills / totalDeaths).toFixed(2) : totalKills;
  
  let mostPlayedAgent = 'Unknown';
  let maxCount = 0;
  for (const [agent, count] of Object.entries(agentCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostPlayedAgent = agent;
    }
  }

  // 3. Fetch Account Data for Lifetime Estimates (Account Level)
  console.log(`Fetching Account Level...`);
  const accRes = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`, { headers });
  let estimatedHours = Math.floor(totalMinutes / 60);
  let estimatedMatches = matches.length;

  if (accRes.ok) {
    const accData = await accRes.json();
    const level = accData.data?.account_level;
    if (level) {
      // 1 Level ≈ 5000 AP ≈ 5-8 hours. We'll use 7 hours per level.
      estimatedHours = Math.floor(level * 7);
      // Average match is ~35 mins. (level * 7 hours * 60 mins) / 35 ≈ level * 12 matches.
      estimatedMatches = Math.floor(level * 12);
    }
  }

  const finalValData = {
    riotId: RIOT_ID,
    rank: mmr.current_data.currenttierpatched,
    rr: mmr.current_data.ranking_in_tier,
    mmrChange: mmr.current_data.mmr_change_to_last_game,
    rankIcon: mmr.current_data.images?.large || "https://media.valorant-api.com/competitivetiers/564d8e28-c226-3180-6285-e19a31071844/0/largeicon.png",
    peakRank: mmr.highest_rank?.patched_tier || "Unranked",
    peakRankIcon: mmr.highest_rank?.tier ? `https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${mmr.highest_rank.tier}/largeicon.png` : "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/0/largeicon.png",
    kd: kdRatio,
    mostPlayedAgent,
    hoursPlayed: estimatedHours,
    totalMatches: estimatedMatches
  };

  fs.writeFileSync(path.join(dataDir, 'valorant.json'), JSON.stringify(finalValData, null, 2));
  console.log(`Saved Valorant stats. Peak: ${finalValData.peakRank}, KD: ${finalValData.kd}, Agent: ${finalValData.mostPlayedAgent}`);
}

async function main() {
  try {
    await fetchXboxStats();
    await fetchSteamStats();
    await fetchValorantStats();
    console.log('✅ All static data updated successfully!');
  } catch (err) {
    console.error('❌ Error updating stats:', err);
  }
}

main();
