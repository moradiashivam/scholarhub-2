import React from 'react';
import { GraduationCap } from 'lucide-react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import DateDisplay from './DateDisplay';

interface FullscreenTimerProps {
  time: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onReset: () => void;
  onExit: () => void;
}

const FullscreenTimer: React.FC<FullscreenTimerProps> = ({
  time,
  isRunning,
  onToggleTimer,
  onReset,
  onExit
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAzMGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptLTE4LTMwYzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2em0wIDMwYzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10" />

      {/* Content */}
      <div className="relative z-10 space-y-8 text-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-12">
          <GraduationCap className="w-16 h-16 text-white mb-4" />
          <h1 className="text-3xl font-bold text-white tracking-wide">
            ScholarHub
          </h1>
        </div>

        {/* Timer Components */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 space-y-8">
          <DateDisplay isFullscreen={true} />
          <TimerDisplay time={time} isFullscreen={true} />
          <TimerControls
            isRunning={isRunning}
            isFullscreen={true}
            onToggleTimer={onToggleTimer}
            onReset={onReset}
            onToggleFullscreen={onExit}
          />
        </div>
      </div>
    </div>
  );
};

export default FullscreenTimer;