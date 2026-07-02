import React from 'react';
import { Shield, Swords, Trophy, Star, Crown, Loader2, ShieldAlert } from 'lucide-react';
import BorderGlow from './BorderGlow';
import useClashOfClansStats from '../hooks/useClashOfClansStats';

export default function ClashOfClansCard() {
  const { stats: apiStats, isLoading, error } = useClashOfClansStats();

  // Fallback to placeholder if the API fails or keys aren't set up yet
  const stats = apiStats || {
    playerName: "RIZEN",
    playerTag: "#PV00PGUJ2",
    townHall: 14,
    trophies: 4200,
    clanName: "req $ leave ☺",
    clanBadge: "https://api-assets.clashofclans.com/badges/70/_OJh3KBKcL07KRU6HrkFHRduCa6In29EMzkEDZ0UX9I.png",
    warStars: 748,
    experienceLevel: 210,
    bestTrophies: 5003,
    highestLeagueIcon: "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png",
    attackWins: 0,
    role: "Co-Leader"
  };

  return (
    <BorderGlow
      animated={true}
      glowColor="45 100 50" // CoC Yellow/Gold
      colors={['#fcc201', '#ff9900', '#ffcc00']}
      borderRadius={24}
      style={{
        padding: '2rem',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* CoC Thematic Background Element */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        fontSize: '18rem',
        fontWeight: 900,
        color: 'rgba(252, 194, 1, 0.03)',
        lineHeight: 1,
        pointerEvents: 'none',
        transform: 'rotate(15deg)'
      }}>
        C
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: '2rem', margin: 0, color: '#fcc201', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Swords size={28} />
          Clash of Clans
        </h3>
        
        {isLoading && <Loader2 className="animate-spin" color="#fcc201" />}
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', justifyContent: 'space-between', flex: 1 }}>
          {/* Top Section: Town Hall and Player Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            
            <div style={{ 
              width: '90px', height: '90px', 
              background: 'linear-gradient(135deg, #333, #111)', 
              borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #fcc201',
              boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
            }}>
              <span style={{ color: '#fcc201', fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center', lineHeight: 1.2 }}>
                TH<br/>{stats.townHall}
              </span>
            </div>
            
            <div style={{ flex: 1, minWidth: '180px' }}>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                {stats.playerName}
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{stats.playerTag}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Best Trophies
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'clamp(1.8rem, 6vw, 3rem)', color: 'white', fontWeight: 900, lineHeight: 1 }}>
                  {stats.highestLeagueIcon ? (
                    <img src={stats.highestLeagueIcon} alt="League Medal" style={{ width: '40px', height: '40px', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }} />
                  ) : (
                    <img src="https://static.wikia.nocookie.net/clashofclans/images/9/90/Trophy.png" alt="Trophy" style={{ width: '36px', height: '36px', objectFit: 'contain' }} /> 
                  )}
                  {stats.bestTrophies}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                    {stats.clanBadge ? (
                      <img src={stats.clanBadge} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }} />
                    ) : (
                      <Shield size={20} color="#00ffcc" />
                    )}
                    <span>{stats.clanName} <span style={{opacity: 0.7, fontSize: '0.9rem', fontWeight: 500}}>({stats.role})</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Extended Stats Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem' 
          }}>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                <Star size={14} color="#fcc201" />
                War Stars
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
                {stats.warStars}
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                <img src="https://static.wikia.nocookie.net/clashofclans/images/9/90/Trophy.png" alt="Trophy" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                Current Trophies
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
                {stats.trophies}
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                <Swords size={14} color="#00ffcc" />
                Attack Wins
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
                {stats.attackWins}
              </span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                <Crown size={14} color="#ff007f" />
                Exp Level
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
                {stats.experienceLevel}
              </span>
            </div>

          </div>
        </div>
      </div>
    </BorderGlow>
  );
}
