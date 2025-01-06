import React from 'react';

interface ColorBoxProps {
  color: string;
  name: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, name }) => (
  <div className="flex flex-col items-center mb-2">
    <div 
      className="w-24 h-24 rounded-lg shadow-md mb-2 transition-transform hover:scale-105" 
      style={{ backgroundColor: color }}
    />
    <span className="text-sm font-medium">{name}</span>
    <span className="text-xs text-gray-500 dark:text-gray-400">{color}</span>
  </div>
);

export default ColorBox;