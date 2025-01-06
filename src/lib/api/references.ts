import { api } from './axios';
import { Reference } from '../../types';

export const getReferences = async () => {
  const { data } = await api.get('/references');
  return data;
};

export const createReference = async (reference: Omit<Reference, 'id'>) => {
  const { data } = await api.post('/references', reference);
  return data;
};

export const deleteReference = async (id: string) => {
  await api.delete(`/references/${id}`);
};