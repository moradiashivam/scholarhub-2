import React, { useState, useEffect } from 'react';
import Confetti from './Confetti';

interface ProgressBarProps {
  progress: number;
  onChange: (value: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, onChange }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [prevProgress, setPrevProgress] = useState(progress);

  useEffect(() => {
    if (progress === 100 && prevProgress < 100) {
      setShowConfetti(true);
    }
    setPrevProgress(progress);
  }, [progress, prevProgress]);

  return (
    <div className="relative w-full">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:cursor-pointer"
      />
      <div
        className="absolute top-0 left-0 h-2 bg-indigo-600 rounded-full pointer-events-none transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
      {showConfetti && (
        <Confetti onComplete={() => setShowConfetti(false)} />
      )}
    </div>
  );
};

export default ProgressBar;