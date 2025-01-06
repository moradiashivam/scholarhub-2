import React, { useRef, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import ResizeHandle from './ResizeHandle';
import { useResize } from './useResize';
import { panelColors, PanelType } from '../../../utils/dashboardColors';

interface ResizablePanelProps {
  children: React.ReactNode;
  id: string;
  title?: string;
  type: PanelType;
  defaultWidth?: number | string;
  defaultHeight?: number;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number;
  maxHeight?: number;
  onResize?: (size: { width: number; height: number }) => void;
  constrainToWindow?: boolean;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  id,
  title,
  type,
  defaultWidth = '100%',
  defaultHeight = 400,
  minWidth = 200,
  maxWidth = '100%',
  minHeight = 200,
  maxHeight = 800,
  onResize,
  constrainToWindow = false
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const colors = panelColors[type];
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Convert width values to numbers if they're percentages
  const getInitialWidth = () => {
    if (typeof defaultWidth === 'string' && defaultWidth.endsWith('%')) {
      return panelRef.current ? 
        (parseFloat(defaultWidth) / 100) * panelRef.current.parentElement!.offsetWidth :
        400;
    }
    return typeof defaultWidth === 'number' ? defaultWidth : 400;
  };

  const { size, isResizing, handleResizeStart, resizeDirection } = useResize({
    defaultWidth: getInitialWidth(),
    defaultHeight,
    minWidth: typeof minWidth === 'number' ? minWidth : 200,
    maxWidth: typeof maxWidth === 'number' ? maxWidth : window.innerWidth,
    minHeight,
    maxHeight,
    onResize,
    constrainToWindow,
    containerRef: panelRef
  });

  useEffect(() => {
    if (isResizing) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = resizeDirection === 'horizontal' ? 'ew-resize' : 'ns-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    return () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, resizeDirection]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onResize) {
      onResize({
        width: getInitialWidth(),
        height: isExpanded ? defaultHeight : maxHeight
      });
    }
  };

  // Handle width style based on whether it's a percentage or pixel value
  const getWidthStyle = () => {
    if (typeof defaultWidth === 'string' && defaultWidth.endsWith('%')) {
      return defaultWidth;
    }
    return `${size.width}px`;
  };

  return (
    <div 
      ref={panelRef}
      className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 ${colors.border} overflow-hidden
        ${isExpanded ? 'z-10' : ''}`}
      style={{ 
        width: getWidthStyle(),
        height: isExpanded ? maxHeight : size.height,
        transition: isResizing ? 'none' : 'all 0.2s'
      }}
    >
      {title && (
        <div className={`flex items-center justify-between px-4 py-2 ${colors.header} border-b border-gray-200 dark:border-gray-700`}>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleExpand}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4 text-gray-500" />
              ) : (
                <Maximize2 className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      )}
      
      <div 
        className="p-4 overflow-auto" 
        style={{ height: title ? `calc(100% - 41px)` : '100%' }}
      >
        {children}
      </div>

      <ResizeHandle
        direction="vertical"
        onMouseDown={(e) => handleResizeStart(e, 'vertical')}
      />

      <ResizeHandle
        direction="horizontal"
        onMouseDown={(e) => handleResizeStart(e, 'horizontal')}
      />

      <ResizeHandle
        direction="corner"
        onMouseDown={(e) => handleResizeStart(e, 'corner')}
        className="z-10"
      />

      {isResizing && (
        <div className="fixed inset-0 z-50" style={{ 
          cursor: resizeDirection === 'horizontal' ? 'ew-resize' : 'ns-resize'
        }} />
      )}
    </div>
  );
};

export default ResizablePanel;