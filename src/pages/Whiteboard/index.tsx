import React from 'react';
import WhiteboardToolbar from '../../components/whiteboard/WhiteboardToolbar';
import Canvas from '../../components/whiteboard/Canvas';
import { useWhiteboard } from '../../components/whiteboard/hooks/useWhiteboard';
import { Point } from '../../components/whiteboard/types';

const WhiteboardPage: React.FC = () => {
  const {
    state,
    activeTool,
    showGrid,
    currentElement,
    setActiveTool,
    setShowGrid,
    setCurrentElement,
    addElement,
    updateElement,
    undo,
    redo,
    clear
  } = useWhiteboard();

  const handlePointerDown = (point: Point) => {
    const element = {
      id: Date.now().toString(),
      type: activeTool,
      points: [point],
      color: '#000',
      width: 2
    };
    setCurrentElement(element);
  };

  const handlePointerMove = (point: Point) => {
    if (!currentElement) return;
    
    const updatedElement = {
      ...currentElement,
      points: [...currentElement.points, point]
    };
    setCurrentElement(updatedElement);
  };

  const handlePointerUp = () => {
    if (!currentElement) return;
    addElement(currentElement);
    setCurrentElement(null);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-gray-900">
      <WhiteboardToolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        onUndo={undo}
        onRedo={redo}
        onDownload={handleDownload}
        onToggleGrid={() => setShowGrid(!showGrid)}
        showGrid={showGrid}
        canUndo={state.undoStack.length > 0}
        canRedo={state.redoStack.length > 0}
      />
      <div className="flex-1 relative">
        <Canvas
          state={state}
          activeTool={activeTool}
          showGrid={showGrid}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      </div>
    </div>
  );
};

export default WhiteboardPage;