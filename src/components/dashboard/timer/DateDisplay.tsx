import React from 'react';
import { format } from 'date-fns';

interface DateDisplayProps {
  isFullscreen: boolean;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ isFullscreen }) => {
  const currentDate = format(new Date(), 'dd/MM/yyyy');
  
  return (
    <div className={`${
      isFullscreen 
        ? 'text-2xl mb-4 text-white/90' 
        : 'text-sm mb-2 text-gray-600 dark:text-gray-400'
    }`}>
      {currentDate}
    </div>
  );
};

export default DateDisplay;