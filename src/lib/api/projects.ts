import { api } from './axios';
import { Project } from '../../types';

export const getProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

export const createProject = async (project: Omit<Project, 'id'>) => {
  const { data } = await api.post('/projects', project);
  return data;
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const { data } = await api.put(`/projects/${id}`, project);
  return data;
};

export const deleteProject = async (id: string) => {
  await api.delete(`/projects/${id}`);
};