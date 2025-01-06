import { useState, useCallback } from 'react';
import { DropResult } from '@hello-pangea/dnd';

export const useDraggableItems = (initialItems: React.ReactNode[]) => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  }, [items]);

  return {
    items,
    handleDragEnd
  };
};