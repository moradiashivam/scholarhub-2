import { useState, useCallback, useEffect, RefObject } from 'react';

interface UseResizeProps {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  onResize?: (size: { width: number; height: number }) => void;
  constrainToWindow?: boolean;
  containerRef?: RefObject<HTMLElement>;
}

export const useResize = ({
  minWidth = 200,
  maxWidth = 800,
  minHeight = 200,
  maxHeight = 800,
  defaultWidth = 400,
  defaultHeight = 300,
  onResize,
  constrainToWindow = false,
  containerRef
}: UseResizeProps = {}) => {
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isResizing, setIsResizing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [resizeDirection, setResizeDirection] = useState<'vertical' | 'horizontal' | 'corner' | null>(null);

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: 'vertical' | 'horizontal' | 'corner') => {
    e.preventDefault();
    setIsResizing(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    setStartSize({ width: size.width, height: size.height });
    setResizeDirection(direction);
  }, [size]);

  const handleResize = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeDirection) return;

    const deltaX = e.clientX - startPosition.x;
    const deltaY = e.clientY - startPosition.y;

    let newWidth = size.width;
    let newHeight = size.height;

    if (resizeDirection === 'horizontal' || resizeDirection === 'corner') {
      newWidth = Math.max(minWidth, Math.min(maxWidth, startSize.width + deltaX));
    }
    
    if (resizeDirection === 'vertical' || resizeDirection === 'corner') {
      newHeight = Math.max(minHeight, Math.min(maxHeight, startSize.height + deltaY));
    }

    if (constrainToWindow && containerRef?.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const maxWindowWidth = window.innerWidth - containerRect.left - 20;
      const maxWindowHeight = window.innerHeight - containerRect.top - 20;
      newWidth = Math.min(newWidth, maxWindowWidth);
      newHeight = Math.min(newHeight, maxWindowHeight);
    }

    const newSize = { width: newWidth, height: newHeight };
    setSize(newSize);
    onResize?.(newSize);
  }, [isResizing, resizeDirection, startPosition, startSize, minWidth, maxWidth, minHeight, maxHeight, size, onResize, constrainToWindow, containerRef]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    setResizeDirection(null);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, handleResize, handleResizeEnd]);

  return {
    size,
    isResizing,
    handleResizeStart,
    resizeDirection
  };
};