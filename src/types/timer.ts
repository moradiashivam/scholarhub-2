export interface TimerControlsProps {
  isRunning: boolean;
  isFullscreen: boolean;
  onToggleTimer: () => void;
  onReset: () => void;
  onToggleFullscreen: () => void;
}