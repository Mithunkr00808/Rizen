import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element with a reliable, royalty-free ambient track URL
    audioRef.current = new Audio('https://cdn.freesound.org/previews/515/515366_10526017-lq.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6; // Increased volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`music-player ${isPlaying ? 'playing' : ''}`} onClick={togglePlay}>
      <div className="music-icon-wrapper">
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </div>
      <span className="music-text">SOUNDSCAPE</span>
      <div className="equalizer">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
};

export default MusicPlayer;
