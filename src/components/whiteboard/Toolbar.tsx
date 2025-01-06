import React from 'react';
import { Download, Undo, Sun, Moon } from 'lucide-react';
import { ToolbarProps } from './types';

const Toolbar: React.FC<ToolbarProps> = ({
  onUndo,
  onDownload,
  onThemeToggle,
  canUndo,
  theme
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <div className="flex gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={onDownload}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Download"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
      <button
        onClick={onThemeToggle}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        title="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default Toolbar;