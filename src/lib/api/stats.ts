import { api } from './axios';

interface Stats {
  activeProjects: number;
  hoursLogged: number;
  references: number;
  researchNotes: number;
}

export const getStats = async (): Promise<Stats> => {
  const { data } = await api.get<Stats>('/stats');
  return data;
};