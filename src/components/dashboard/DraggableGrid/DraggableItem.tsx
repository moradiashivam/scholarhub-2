import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { DraggableItemProps } from './types';

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, index, children }) => (
  <Draggable draggableId={id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        className={`relative ${snapshot.isDragging ? 'z-50' : ''}`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div
            {...provided.dragHandleProps}
            className="absolute top-3 right-3 p-1 cursor-move hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>
          {children}
        </div>
      </div>
    )}
  </Draggable>
);