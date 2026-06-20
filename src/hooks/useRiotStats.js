import { useState, useEffect } from 'react';
import valorantData from '../data/valorant.json';

export default function useRiotStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate a tiny delay for smooth UI transition
    const timer = setTimeout(() => {
      try {
        if (!valorantData || !valorantData.riotId) {
            throw new Error("Static data is empty. Run update-stats.");
        }
        setStats(valorantData);
      } catch (err) {
        console.error("Failed to load static Valorant data", err);
        setError("Failed to load local Valorant data. Please run 'npm run update-stats'.");
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { stats, isLoading, error };
}
