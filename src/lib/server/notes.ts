import { query } from '../db';
import { Note } from '../../types';

export const getNotesByUserId = async (userId: string) => {
  return query<Note>(
    'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
};

export const createNote = async (userId: string, note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
  const result = await query<{ insertId: number }>(
    'INSERT INTO notes (user_id, project_id, title, content) VALUES (?, ?, ?, ?)',
    [userId, note.projectId, note.title, note.content]
  );
  
  return {
    id: result[0].insertId.toString(),
    ...note,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};