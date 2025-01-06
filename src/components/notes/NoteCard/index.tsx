import React from 'react';
import { Note } from '../../../types';
import { NoteHeader } from './NoteHeader';
import { NoteTimestamp } from './NoteTimestamp';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
      <NoteHeader 
        title={note.title} 
        onDelete={() => onDelete(note.id)} 
      />
      <p className="text-gray-600 mb-4 mt-2 line-clamp-3">{note.content}</p>
      <NoteTimestamp date={note.updatedAt} />
    </div>
  );
};

export default NoteCard;