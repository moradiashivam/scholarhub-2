import React, { useEffect } from 'react';
import './confetti.css';

interface ConfettiProps {
  onComplete?: () => void;
}

const Confetti: React.FC<ConfettiProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="confetti-container">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;