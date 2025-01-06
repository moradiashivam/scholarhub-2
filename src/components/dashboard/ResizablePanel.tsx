import React, { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  title?: string;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  defaultHeight = 300,
  minHeight = 200,
  maxHeight = 800,
  title
}) => {
  const [height, setHeight] = useState(defaultHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(height);
  const panelRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
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
      ref={panelRef}
      className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
      style={{ height }}
    >
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          <button
            onMouseDown={handleMouseDown}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-ns-resize"
          >
            <GripVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      )}
      <div className="p-4 overflow-auto" style={{ height: title ? 'calc(100% - 41px)' : '100%' }}>
        {children}
      </div>
      {isDragging && (
        <div className="fixed inset-0 z-50 cursor-ns-resize" />
      )}
    </div>
  );
};

export default ResizablePanel;