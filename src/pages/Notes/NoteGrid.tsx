import React from 'react';
import { Note } from '../../types';
import NoteCard from '../../components/NoteCard';

interface NoteGridProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {notes.map(note => (
      <NoteCard 
        key={note.id} 
        note={note} 
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default NoteGrid;