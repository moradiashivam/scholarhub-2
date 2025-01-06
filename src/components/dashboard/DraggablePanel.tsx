import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';

interface DraggablePanelProps {
  children: React.ReactNode;
  title: string;
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
}

const DraggablePanel: React.FC<DraggablePanelProps> = ({
  children,
  title,
  defaultHeight = 400,
  minHeight = 200,
  maxHeight = 800
}) => {
  const [height, setHeight] = useState(defaultHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(height);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartHeight(height);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const delta = e.clientY - startY;
    const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + delta));
    setHeight(newHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
      style={{ height }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        <button
          onMouseDown={handleMouseDown}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-ns-resize"
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="p-4 overflow-auto" style={{ height: 'calc(100% - 60px)' }}>
        {children}
      </div>
    </div>
  );
};

export default DraggablePanel;