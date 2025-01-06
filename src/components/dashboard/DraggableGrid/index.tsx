import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { DraggableGridProps } from './types';
import { DraggableItem } from './DraggableItem';
import { useDraggableItems } from './hooks/useDraggableItems';

export const DraggableGrid: React.FC<DraggableGridProps> = ({ children }) => {
  const { items, handleDragEnd } = useDraggableItems(React.Children.toArray(children));

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="dashboard-grid">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {items.map((item, index) => (
              <DraggableItem
                key={`draggable-${index}`}
                id={`item-${index}`}
                index={index}
              >
                {item}
              </DraggableItem>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableGrid;