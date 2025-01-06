import { useEffect, useRef } from 'react';
import { getStroke } from 'perfect-freehand';
import { Path } from '../types';

export const useCanvas = (paths: Path[], backgroundColor: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear and set background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all paths
    paths.forEach(path => {
      const stroke = getStroke(path.points, {
        size: 3,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
      });

      ctx.fillStyle = path.color;
      ctx.beginPath();
      ctx.moveTo(stroke[0][0], stroke[0][1]);
      
      for (const [x, y] of stroke) {
        ctx.lineTo(x, y);
      }
      
      ctx.fill();
    });
  }, [paths, backgroundColor]);

  return canvasRef;
};