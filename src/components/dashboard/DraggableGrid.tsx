import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical } from 'lucide-react';

interface DraggableGridProps {
  children: React.ReactNode[];
}

const DraggableGrid: React.FC<DraggableGridProps> = ({ children }) => {
  const [items, setItems] = useState(React.Children.toArray(children));

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

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
              <Draggable key={index} draggableId={`item-${index}`} index={index}>
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
                      {item}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableGrid;