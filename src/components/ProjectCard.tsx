import React from 'react';
import { Calendar, Tag, Clock, Edit3, Trash2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const statusColors = {
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    planned: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 dark:bg-gray-800 dark:border-gray-700 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
            {project.status}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(project)}
              className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Edit project"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Delete project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {project.description}
      </p>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{new Date(project.startDate).toLocaleDateString()}</span>
        {project.endDate && (
          <>
            <Clock className="w-4 h-4 mx-2" />
            <span>{new Date(project.endDate).toLocaleDateString()}</span>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-600 dark:text-gray-300"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;