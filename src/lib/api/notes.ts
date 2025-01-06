import { api } from './axios';
import { Note } from '../../types';

export const getNotes = async () => {
  const { data } = await api.get('/notes');
  return data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};