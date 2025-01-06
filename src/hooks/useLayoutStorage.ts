import { useState, useEffect } from 'react';

interface PanelSize {
  width: number;
  height: number;
}

interface LayoutStorage {
  [key: string]: PanelSize;
}

const LAYOUT_STORAGE_KEY = 'dashboard_layout';

export const useLayoutStorage = () => {
  const [layout, setLayout] = useState<LayoutStorage>(() => {
    const saved = localStorage.getItem(LAYOUT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
  }, [layout]);

  const updatePanelSize = (panelId: string, size: PanelSize) => {
    setLayout(prev => ({
      ...prev,
      [panelId]: size
    }));
  };

  const getPanelSize = (panelId: string): PanelSize | undefined => {
    return layout[panelId];
  };

  return {
    getPanelSize,
    updatePanelSize
  };
};