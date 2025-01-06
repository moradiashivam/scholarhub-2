import { api } from './axios';
import { FileStorage, FileStorageStats } from '../../types';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const { data } = await api.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export const getFiles = async () => {
  const { data } = await api.get('/files');
  return data;
};

export const deleteFile = async (id: string) => {
  await api.delete(`/files/${id}`);
};

export const getStorageStats = async (): Promise<FileStorageStats> => {
  const { data } = await api.get('/files/stats');
  return data;
};