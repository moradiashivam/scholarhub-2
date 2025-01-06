import { useState, useCallback } from 'react';
import { Tool, WhiteboardState, WhiteboardElement, Point } from '../types';

const initialState: WhiteboardState = {
  elements: [],
  undoStack: [],
  redoStack: []
};

export const useWhiteboard = () => {
  const [state, setState] = useState<WhiteboardState>(initialState);
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [showGrid, setShowGrid] = useState(true);
  const [currentElement, setCurrentElement] = useState<WhiteboardElement | null>(null);

  const addElement = useCallback((element: WhiteboardElement) => {
    setState(prev => ({
      elements: [...prev.elements, element],
      undoStack: [...prev.undoStack, prev.elements],
      redoStack: []
    }));
  }, []);

  const updateElement = useCallback((element: WhiteboardElement) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === element.id ? element : el
      )
    }));
  }, []);

  const undo = useCallback(() => {
    setState(prev => {
      if (prev.undoStack.length === 0) return prev;
      const newElements = prev.undoStack[prev.undoStack.length - 1];
      return {
        elements: newElements,
        undoStack: prev.undoStack.slice(0, -1),
        redoStack: [prev.elements, ...prev.redoStack]
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState(prev => {
      if (prev.redoStack.length === 0) return prev;
      const newElements = prev.redoStack[0];
      return {
        elements: newElements,
        undoStack: [...prev.undoStack, prev.elements],
        redoStack: prev.redoStack.slice(1)
      };
    });
  }, []);

  const clear = useCallback(() => {
    setState(prev => ({
      elements: [],
      undoStack: [...prev.undoStack, prev.elements],
      redoStack: []
    }));
  }, []);

  return {
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
  };
};