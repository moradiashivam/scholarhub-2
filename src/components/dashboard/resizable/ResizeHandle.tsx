import React from 'react';
import { GripVertical, GripHorizontal } from 'lucide-react';

interface ResizeHandleProps {
  direction: 'vertical' | 'horizontal' | 'corner';
  onMouseDown: (e: React.MouseEvent) => void;
  className?: string;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ direction, onMouseDown, className = '' }) => {
  const getClassName = () => {
    const base = "absolute flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700";
    switch (direction) {
      case 'vertical':
        return `${base} bottom-0 left-0 right-0 h-2 cursor-ns-resize ${className}`;
      case 'horizontal':
        return `${base} top-0 bottom-0 right-0 w-2 cursor-ew-resize ${className}`;
      case 'corner':
        return `${base} bottom-0 right-0 w-4 h-4 cursor-nwse-resize ${className}`;
    }
  };

  return (
    <div className={getClassName()} onMouseDown={onMouseDown}>
      {direction === 'vertical' ? (
        <GripHorizontal className="w-4 h-4 text-gray-400" />
      ) : (
        <GripVertical className="w-4 h-4 text-gray-400" />
      )}
    </div>
  );
};

export default ResizeHandle;