import React from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { TimerControlsProps } from '../../../types/timer';

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  isFullscreen,
  onToggleTimer,
  onReset,
  onToggleFullscreen
}) => {
  const baseButtonClasses = isFullscreen
    ? 'p-4 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110'
    : 'p-3 rounded-full';

  return (
    <div className="flex justify-center gap-6">
      <button
        onClick={onToggleTimer}
        className={`${baseButtonClasses} ${
          isFullscreen
            ? isRunning
              ? 'bg-red-500/20 text-red-100 hover:bg-red-500/30'
              : 'bg-green-500/20 text-green-100 hover:bg-green-500/30'
            : isRunning
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20'
              : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/20'
        }`}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? (
          <Pause className={isFullscreen ? 'w-8 h-8' : 'w-5 h-5'} />
        ) : (
          <Play className={isFullscreen ? 'w-8 h-8' : 'w-5 h-5'} />
        )}
      </button>
      
      <button
        onClick={onReset}
        className={`${baseButtonClasses} ${
          isFullscreen
            ? 'bg-gray-500/20 text-gray-100 hover:bg-gray-500/30'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
        }`}
        aria-label="Reset timer"
      >
        <RotateCcw className={isFullscreen ? 'w-8 h-8' : 'w-5 h-5'} />
      </button>
      
      <button
        onClick={onToggleFullscreen}
        className={`${baseButtonClasses} ${
          isFullscreen
            ? 'bg-white/20 text-white hover:bg-white/30'
            : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-800/30'
        }`}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <Minimize2 className="w-8 h-8" />
        ) : (
          <Maximize2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

// Also provide a default export
export default TimerControls;