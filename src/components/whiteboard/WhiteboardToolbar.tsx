import React from 'react';
import { 
  Square, Circle, Type, Pencil, Minus, // Replace Line with Minus for line tool
  Table, GitBranch, Eraser, Undo, 
  Redo, Download, Grid, Settings 
} from 'lucide-react';
import { Tool } from './types';

interface WhiteboardToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onUndo: () => void;
  onRedo: () => void;
  onDownload: () => void;
  onToggleGrid: () => void;
  showGrid: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

const WhiteboardToolbar: React.FC<WhiteboardToolbarProps> = ({
  activeTool,
  onToolChange,
  onUndo,
  onRedo,
  onDownload,
  onToggleGrid,
  showGrid,
  canUndo,
  canRedo
}) => {
  const tools = [
    { id: 'select' as Tool, icon: Settings, label: 'Select' },
    { id: 'pen' as Tool, icon: Pencil, label: 'Pen' },
    { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle' },
    { id: 'circle' as Tool, icon: Circle, label: 'Circle' },
    { id: 'line' as Tool, icon: Minus, label: 'Line' }, // Updated icon
    { id: 'text' as Tool, icon: Type, label: 'Text' },
    { id: 'table' as Tool, icon: Table, label: 'Table' },
    { id: 'flowchart' as Tool, icon: GitBranch, label: 'Flowchart' },
    { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser' }
  ];

  return (
    <div className="flex items-center justify-between p-2 border-b dark:border-gray-700">
      <div className="flex items-center space-x-2">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`p-2 rounded-lg transition-colors ${
              activeTool === tool.id
                ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={tool.label}
          >
            <tool.icon className="w-5 h-5" />
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleGrid}
          className={`p-2 rounded-lg ${
            showGrid
              ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Toggle Grid"
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={onDownload}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          title="Download"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WhiteboardToolbar;