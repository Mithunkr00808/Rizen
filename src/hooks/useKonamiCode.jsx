import { useEffect, useState } from 'react';

const konamiCodeSequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export const useKonamiCode = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sequence, setSequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      setSequence((prev) => {
        const newSequence = [...prev, key];
        
        // Keep only the last N keystrokes
        if (newSequence.length > konamiCodeSequence.length) {
          newSequence.shift();
        }

        // Check if the sequence matches
        if (newSequence.join(',').toLowerCase() === konamiCodeSequence.join(',').toLowerCase()) {
          setIsUnlocked(true);
          // Optional: reset after triggering
          // return [];
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return isUnlocked;
};
