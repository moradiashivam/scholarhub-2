import { api } from './axios';

export const testDatabaseConnection = async (config: {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}) => {
  const { data } = await api.post('/install/test-db', config);
  return data;
};

export const installSystem = async (
  dbConfig: {
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
  },
  adminConfig: {
    name: string;
    email: string;
    password: string;
  },
  onStepStart: (stepId: string) => void
) => {
  // Step 1: Initialize database
  onStepStart('database');
  await api.post('/install/database', dbConfig);

  // Step 2: Create admin account
  onStepStart('admin');
  await api.post('/install/admin', adminConfig);

  // Step 3: Save configuration
  onStepStart('config');
  await api.post('/install/config', { db: dbConfig });
};