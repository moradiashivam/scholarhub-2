import React, { useRef, useEffect } from 'react';
import { WhiteboardState, Point, Tool } from './types';
import { drawElement } from './utils/drawing';

interface CanvasProps {
  state: WhiteboardState;
  activeTool: Tool;
  showGrid: boolean;
  onPointerDown: (point: Point) => void;
  onPointerMove: (point: Point) => void;
  onPointerUp: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
  state,
  activeTool,
  showGrid,
  onPointerDown,
  onPointerMove,
  onPointerUp
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid if enabled
    if (showGrid) {
      const gridSize = 20;
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Draw all elements
    state.elements.forEach(element => {
      drawElement(ctx, element);
    });
  }, [state, showGrid]);

  const getPoint = (e: React.PointerEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair touch-none"
      onPointerDown={e => onPointerDown(getPoint(e))}
      onPointerMove={e => onPointerMove(getPoint(e))}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    />
  );
};

export default Canvas;