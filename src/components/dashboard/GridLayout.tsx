import React from 'react';
import ResizablePanel from './resizable/ResizablePanel';
import { PanelType } from '../../utils/dashboardColors';
import { useLayoutStorage } from '../../hooks/useLayoutStorage';

interface GridLayoutProps {
  children: React.ReactNode[];
}

const GridLayout: React.FC<GridLayoutProps> = ({ children }) => {
  const { getPanelSize, updatePanelSize } = useLayoutStorage();

  // Define panel configurations
  const getPanelConfig = (index: number): { id: string; title: string; type: PanelType } => {
    switch (index) {
      case 0:
        return { id: 'tasks', title: 'Tasks', type: 'tasks' };
      case 1:
        return { id: 'deadlines', title: 'Deadlines', type: 'deadlines' };
      case 2:
        return { id: 'progress', title: 'Research Progress', type: 'progress' };
      case 3:
        return { id: 'timer', title: 'Timer', type: 'timer' };
      case 4:
        return { id: 'activities', title: 'Recent Activities', type: 'activities' };
      case 5:
        return { id: 'feed', title: 'Research Feed', type: 'feed' };
      default:
        return { id: `panel-${index}`, title: `Panel ${index + 1}`, type: 'tasks' };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {React.Children.map(children, (child, index) => {
        if (!child) return null;

        const config = getPanelConfig(index);
        const savedSize = getPanelSize(config.id);
        
        return (
          <div key={config.id} className="min-w-0 relative">
            <ResizablePanel
              id={config.id}
              title={config.title}
              type={config.type}
              defaultWidth={savedSize?.width || '100%'}
              defaultHeight={savedSize?.height || 400}
              minWidth={300}
              maxWidth="100%"
              minHeight={200}
              maxHeight={800}
              onResize={(size) => updatePanelSize(config.id, size)}
              constrainToWindow
            >
              {child}
            </ResizablePanel>
          </div>
        );
      })}
    </div>
  );
};

export default GridLayout;