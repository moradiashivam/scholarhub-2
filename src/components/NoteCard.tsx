import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import { Note } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
        <button 
          onClick={() => onDelete(note.id)}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
          aria-label="Delete note"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p className="text-gray-600 mb-4 mt-2 line-clamp-3">{note.content}</p>
      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="w-4 h-4 mr-2" />
        <span>Updated {formatDistanceToNow(new Date(note.updatedAt))} ago</span>
      </div>
    </div>
  );
};

export default NoteCard;