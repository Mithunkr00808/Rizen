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
        setLibrary(xboxData);
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
