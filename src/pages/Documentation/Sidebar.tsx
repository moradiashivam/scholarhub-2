import React from 'react';
import { sections } from './sections';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-full lg:w-64 mb-8 lg:mb-0">
      <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <nav>
          <ul className="space-y-1">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left transition-colors
                    ${activeSection === section.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  {section.icon && <section.icon className="w-5 h-5" />}
                  <span>{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;