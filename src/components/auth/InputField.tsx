import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative">
      <Icon className="absolute top-3 left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
      <input
        {...props}
        className="appearance-none rounded-md relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
      />
    </div>
  );
};

export default InputField;