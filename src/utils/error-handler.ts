import { toast } from 'react-hot-toast';

export interface AppError extends Error {
  code?: string;
  status?: number;
}

export const handleError = (error: unknown) => {
  const errorMessage = getErrorMessage(error);
  toast.error(errorMessage);
  return errorMessage;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('Email already registered')) {
      return 'This email is already registered. Please use a different email.';
    }
    if (error.message.includes('Invalid credentials')) {
      return 'Invalid email or password. Please try again.';
    }
    if (error.message.includes('JWT')) {
      return 'Your session has expired. Please login again.';
    }
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && 
    (error.message.includes('Network Error') || 
     error.message.includes('Failed to fetch'));
};