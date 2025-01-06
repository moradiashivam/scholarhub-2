import { api } from './axios';

export const getDashboardStats = async () => {
  const { data } = await api.get('/dashboard/stats');
  return data;
};

export const getDashboardTasks = async () => {
  const { data } = await api.get('/dashboard/tasks');
  return data;
};

export const getDashboardDeadlines = async () => {
  const { data } = await api.get('/dashboard/deadlines');
  return data;
};

export const getDashboardProgress = async () => {
  const { data } = await api.get('/dashboard/progress');
  return data;
};

export const getDashboardActivities = async () => {
  const { data } = await api.get('/dashboard/activities');
  return data;
};