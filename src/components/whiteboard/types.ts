export type Tool = 
  | 'select'
  | 'pen'
  | 'rectangle'
  | 'circle'
  | 'line'
  | 'text'
  | 'table'
  | 'flowchart'
  | 'eraser';

export type Point = {
  x: number;
  y: number;
};

export type Shape = {
  id: string;
  type: Tool;
  points: Point[];
  color: string;
  width: number;
};

export type TableData = {
  id: string;
  rows: number;
  cols: number;
  cells: string[][];
  position: Point;
};

export type TextData = {
  id: string;
  text: string;
  position: Point;
  fontSize: number;
  color: string;
};

export type WhiteboardElement = Shape | TableData | TextData;

export type WhiteboardState = {
  elements: WhiteboardElement[];
  undoStack: WhiteboardElement[][];
  redoStack: WhiteboardElement[][];
};