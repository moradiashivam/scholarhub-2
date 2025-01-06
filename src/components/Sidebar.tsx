import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap,
  LayoutDashboard,
  FolderKanban,
  FileText,
  BookMarked,
  Clock,
  Briefcase,
  File,
  PenTool,
  Settings
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: BookMarked, label: 'References', path: '/references' },
    { icon: Clock, label: 'Submissions', path: '/submissions' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: File, label: 'Files', path: '/files' },
    { icon: PenTool, label: 'Whiteboard', path: '/whiteboard' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ScholarHub
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center px-4 py-3 mb-1 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-md transition-colors ${
                isActive ? 'bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;