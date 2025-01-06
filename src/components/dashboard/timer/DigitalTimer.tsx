import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import FullscreenTimer from './FullscreenTimer';
import DateDisplay from './DateDisplay';

const DigitalTimer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <FullscreenTimer
        time={time}
        isRunning={isRunning}
        onToggleTimer={handleToggleTimer}
        onReset={handleReset}
        onExit={handleToggleFullscreen}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Research Timer
        </h2>
      </div>
      
      <div className="text-center py-6">
        <DateDisplay isFullscreen={false} />
        <TimerDisplay time={time} isFullscreen={false} />
      </div>

      <TimerControls
        isRunning={isRunning}
        isFullscreen={false}
        onToggleTimer={handleToggleTimer}
        onReset={handleReset}
        onToggleFullscreen={handleToggleFullscreen}
      />
    </div>
  );
};

export default DigitalTimer;