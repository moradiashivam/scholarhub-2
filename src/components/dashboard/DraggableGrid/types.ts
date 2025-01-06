import { DropResult } from '@hello-pangea/dnd';

export interface DraggableGridProps {
  children: React.ReactNode[];
  onDragEnd?: (result: DropResult) => void;
}

export interface DraggableItemProps {
  id: string;
  index: number;
  children: React.ReactNode;
}