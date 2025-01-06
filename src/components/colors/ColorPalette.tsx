import React from 'react';
import ColorScale from './ColorScale';
import ColorBox from './ColorBox';
import { colors } from '../../utils/colors/constants';

const ColorPalette: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        ScholarHub Color Palette
      </h2>
      
      <ColorScale colors={colors.primary} title="Primary" />
      <ColorScale colors={colors.secondary} title="Secondary" />
      <ColorScale colors={colors.accent} title="Accent" />
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Status Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <ColorBox color={colors.status.success} name="Success" />
          <ColorBox color={colors.status.warning} name="Warning" />
          <ColorBox color={colors.status.error} name="Error" />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Background Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <ColorBox color={colors.background.light} name="Light Mode" />
          <ColorBox color={colors.background.dark} name="Dark Mode" />
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;