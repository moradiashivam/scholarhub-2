import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useCanvas } from './hooks/useCanvas';
import { useDrawing } from './hooks/useDrawing';
import Toolbar from './Toolbar';
import DrawingCanvas from './DrawingCanvas';

const Whiteboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const strokeColor = theme === 'dark' ? '#fff' : '#000';
  const backgroundColor = theme === 'dark' ? '#1a1a1a' : '#fff';

  const {
    isDrawing,
    paths,
    undoHistory,
    startDrawing,
    draw,
    stopDrawing,
    undo
  } = useDrawing(strokeColor);

  const canvasRef = useCanvas(paths, backgroundColor);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col h-full">
      <Toolbar
        onUndo={undo}
        onDownload={handleDownload}
        onThemeToggle={toggleTheme}
        canUndo={undoHistory.length > 0}
        theme={theme}
      />
      <div className="flex-1 relative">
        <DrawingCanvas
          canvasRef={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};

export default Whiteboard;