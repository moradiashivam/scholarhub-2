export const API_ENDPOINTS = {
  TASKS: '/tasks',
  DEADLINES: '/deadlines',
  PROGRESS: '/progress',
  ACTIVITIES: '/activities'
} as const;

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data. Please try again later.',
  AUTH_REQUIRED: 'Please login to access this feature.',
  GENERIC_ERROR: 'An unexpected error occurred.'
} as const;

export const LOADING_MESSAGES = {
  DASHBOARD: 'Loading your dashboard...',
  DATA: 'Fetching data...'
} as const;