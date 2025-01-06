import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => {
  const colorName = color.match(/bg-(\w+)-/)?.[1] || 'gray';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 
      border-2 border-${colorName}-400 dark:border-${colorName}-500
      hover:border-${colorName}-500 dark:hover:border-${colorName}-400 
      transition-colors duration-200`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} dark:bg-opacity-90`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
        </div>
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </span>
      </div>
      <h3 className="text-xs sm:text-sm lg:text-base text-gray-700 dark:text-gray-200 font-medium">
        {label}
      </h3>
    </div>
  );
};

export default StatCard;