import React from 'react';

interface TimerDisplayProps {
  time: number;
  isFullscreen: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, isFullscreen }) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`font-mono text-center ${
      isFullscreen 
        ? 'text-7xl md:text-8xl text-white' 
        : 'text-4xl text-gray-900 dark:text-gray-100'
    }`}>
      {formatTime(time)}
    </div>
  );
};

export default TimerDisplay;