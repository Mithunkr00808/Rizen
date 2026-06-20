import React from 'react';
import { Loader2, ShieldAlert, Crosshair, Clock, User, TrendingUp } from 'lucide-react';
import useRiotStats from '../hooks/useRiotStats';
import BorderGlow from './BorderGlow';

export default function ValorantCard() {
  const { stats, isLoading, error } = useRiotStats();

  return (
    <BorderGlow
      animated={true}
      glowColor="350 100 60" // Valorant Red
      colors={['#ff4655', '#ff0000', '#ff8a8a']}
      borderRadius={24}
      style={{
        padding: '2rem',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Valorant Thematic Background Element */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        fontSize: '18rem',
        fontWeight: 900,
        color: 'rgba(255, 70, 85, 0.03)',
        lineHeight: 1,
        pointerEvents: 'none',
        transform: 'rotate(15deg)'
      }}>
        V
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: '2rem', margin: 0, color: '#ff4655', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Crosshair size={28} />
          Valorant
        </h3>
        
        {isLoading && <Loader2 className="animate-spin" color="#ff4655" />}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {isLoading ? (
          <div style={{ padding: '2rem 0', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
            Loading Static Data...
          </div>
        ) : error ? (
          <div style={{ padding: '1rem', background: 'rgba(255, 70, 85, 0.1)', borderRadius: '12px', border: '1px solid rgba(255, 70, 85, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4655', marginBottom: '0.5rem', fontWeight: 600 }}>
              <ShieldAlert size={20} />
              Data Error
            </div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.4 }}>
              {error}
            </p>
          </div>
        ) : stats ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Top Section: Rank and Player Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <img 
                src={stats.peakRankIcon || stats.rankIcon} 
                alt={stats.peakRank} 
                style={{ width: '90px', height: '90px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} 
              />
              
              <div style={{ flex: 1, minWidth: '180px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                  {stats.riotId}
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Peak Rank
                    </span>
                  </div>
                  <span style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 900, color: 'white', lineHeight: 1 }}>
                    {stats.peakRank}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                      Current: {stats.rank}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>|</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                      {stats.rr} RR
                    </span>
                    <span style={{ fontSize: '0.9rem', color: stats.mmrChange >= 0 ? '#00ffcc' : '#ff4655', fontWeight: 600 }}>
                      ({stats.mmrChange > 0 ? '+' : ''}{stats.mmrChange})
                    </span>
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
                  <Crosshair size={14} color="#ff4655" />
                  Avg K/D
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
                  {stats.kd}
                </span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                  <User size={14} color="#b19cd9" />
                  Top Agent
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
                  {stats.mostPlayedAgent}
                </span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                  <Clock size={14} color="#ffd700" />
                  Hours Played
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
                  ~{stats.hoursPlayed}h
                </span>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                  <TrendingUp size={14} color="#ff007f" />
                  Total Matches
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>
                  {stats.totalMatches}
                </span>
              </div>

            </div>
          </div>
        ) : null}
      </div>
    </BorderGlow>
  );
}
