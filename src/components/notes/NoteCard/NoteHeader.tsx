import React from 'react';
import { Trash2 } from 'lucide-react';

interface NoteHeaderProps {
  title: string;
  onDelete: () => void;
}

export const NoteHeader: React.FC<NoteHeaderProps> = ({ title, onDelete }) => (
  <div className="flex justify-between items-start">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <button 
      onClick={onDelete}
      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
      aria-label="Delete note"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);