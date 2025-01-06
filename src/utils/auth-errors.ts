export const getAuthErrorMessage = (error: any): string => {
  if (!error) return 'An unknown error occurred';
  
  if (error.message) {
    if (error.message.includes('Email not confirmed')) {
      return 'Please check your email to confirm your account';
    }
    if (error.message.includes('Invalid login credentials')) {
      return 'Invalid email or password';
    }
    if (error.message.includes('Email already registered')) {
      return 'This email is already registered';
    }
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};