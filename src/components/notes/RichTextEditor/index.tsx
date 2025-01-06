import React, { useRef, useEffect } from 'react';
import Toolbar from './Toolbar';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, className }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleFormat = (format: string) => {
    document.execCommand(format, false);
    handleInput();
  };

  const handleFontChange = (font: string) => {
    document.execCommand('fontName', false, font);
    handleInput();
  };

  const handleFontSizeChange = (size: string) => {
    document.execCommand('fontSize', false, size);
    handleInput();
  };

  const handleColorChange = (color: string, type: 'foreground' | 'background') => {
    const command = type === 'foreground' ? 'foreColor' : 'hiliteColor';
    document.execCommand(command, false, color);
    handleInput();
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
      <Toolbar
        onFormatText={handleFormat}
        onFontChange={handleFontChange}
        onFontSizeChange={handleFontSizeChange}
        onColorChange={handleColorChange}
      />
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className={`p-4 min-h-[200px] focus:outline-none ${className}`}
        style={{ overflowY: 'auto' }}
      />
    </div>
  );
};

export default RichTextEditor;