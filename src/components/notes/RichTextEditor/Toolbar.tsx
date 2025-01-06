import React from 'react';
import { Bold, Italic, Underline, Type, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface ToolbarProps {
  onFormatText: (format: string) => void;
  onFontChange: (font: string) => void;
  onFontSizeChange: (size: string) => void;
  onColorChange: (color: string, type: 'foreground' | 'background') => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onFormatText,
  onFontChange,
  onFontSizeChange,
  onColorChange
}) => {
  const fonts = ['Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Courier New'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];

  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
        <button
          onClick={() => onFormatText('bold')}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => onFormatText('italic')}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => onFormatText('underline')}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Type className="w-4 h-4 text-gray-500" />
          <select
            onChange={(e) => onFontChange(e.target.value)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        <select
          onChange={(e) => onFontSizeChange(e.target.value)}
          className="text-sm border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800"
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1 border-l border-r border-gray-200 dark:border-gray-700 px-2">
        <ColorPicker onColorChange={(color) => onColorChange(color, 'foreground')} type="foreground" />
        <ColorPicker onColorChange={(color) => onColorChange(color, 'background')} type="background" />
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onFormatText('justifyLeft')}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onFormatText('justifyCenter')}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => onFormatText('justifyRight')}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onFormatText('justifyFull')}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;