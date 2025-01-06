import React from 'react';
import ColorBox from './ColorBox';

interface ColorScaleProps {
  colors: Record<string, string>;
  title: string;
}

const ColorScale: React.FC<ColorScaleProps> = ({ colors, title }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {Object.entries(colors).map(([shade, color]) => (
        <ColorBox 
          key={shade} 
          color={color} 
          name={`${title}-${shade}`} 
        />
      ))}
    </div>
  </div>
);

export default ColorScale;