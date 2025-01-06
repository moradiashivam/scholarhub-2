import React from 'react';
import { BookOpen, Link as LinkIcon, Calendar, Tag } from 'lucide-react';
import { Reference } from '../types';

interface ReferenceCardProps {
  reference: Reference;
}

const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{reference.title}</h3>
          <p className="text-gray-600 mt-1">{reference.authors.join(', ')}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          reference.type === 'paper' ? 'bg-purple-100 text-purple-800' :
          reference.type === 'book' ? 'bg-blue-100 text-blue-800' :
          reference.type === 'website' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {reference.type}
        </span>
      </div>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>2024</span>
        </div>
        {reference.url && (
          <a 
            href={reference.url}
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <LinkIcon className="w-4 h-4 mr-1" />
            <span>View Source</span>
          </a>
        )}
        {reference.doi && (
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>DOI: {reference.doi}</span>
          </div>
        )}
      </div>

      {reference.notes && (
        <p className="text-gray-600 text-sm mb-4">{reference.notes}</p>
      )}

      <div className="flex flex-wrap gap-2">
        <Tag className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">Project: {reference.projectId}</span>
      </div>
    </div>
  );
};

export default ReferenceCard;