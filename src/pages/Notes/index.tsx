import React, { useState } from 'react';
import { Note } from '../../types';
import NotesHeader from './NotesHeader';
import SearchBar from './SearchBar';
import EmptyState from './EmptyState';
import NoteGrid from './NoteGrid';
import NoteForm from '../../components/notes/NoteForm';

const Notes = () => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="p-8">
      <NotesHeader onNewNote={() => setShowNoteForm(true)} />
      <SearchBar />
      
      {notes.length === 0 ? (
        <EmptyState />
      ) : (
        <NoteGrid notes={notes} onDelete={handleDeleteNote} />
      )}

      {showNoteForm && (
        <NoteForm
          onSubmit={handleAddNote}
          onClose={() => setShowNoteForm(false)}
        />
      )}
    </div>
  );
};

export default Notes;