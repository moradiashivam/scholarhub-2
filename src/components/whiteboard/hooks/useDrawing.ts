import { useState } from 'react';
import { Point, Path } from '../types';

export const useDrawing = (strokeColor: string) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<Path[]>([]);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [undoHistory, setUndoHistory] = useState<Path[][]>([]);

  const startDrawing = (point: Point) => {
    setIsDrawing(true);
    setCurrentPath([point]);
  };

  const draw = (point: Point) => {
    if (!isDrawing) return;
    setCurrentPath(prev => [...prev, point]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (currentPath.length > 0) {
      const newPath = { points: currentPath, color: strokeColor };
      setPaths(prev => {
        setUndoHistory(hist => [...hist.slice(-19), prev]);
        return [...prev, newPath];
      });
      setCurrentPath([]);
    }
  };

  const undo = () => {
    if (undoHistory.length === 0) return;
    const previousPaths = undoHistory[undoHistory.length - 1];
    setUndoHistory(prev => prev.slice(0, -1));
    setPaths(previousPaths);
  };

  return {
    isDrawing,
    paths,
    currentPath,
    undoHistory,
    startDrawing,
    draw,
    stopDrawing,
    undo
  };
};