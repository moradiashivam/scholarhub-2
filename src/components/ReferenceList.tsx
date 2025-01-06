import React from 'react';
import { ChevronRight, Folder } from 'lucide-react';
import { Reference } from '../types';
import ReferenceCard from './ReferenceCard';

interface ReferenceListProps {
  projectName: string;
  references: Reference[];
}

const ReferenceList: React.FC<ReferenceListProps> = ({ projectName, references }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
      >
        <Folder className="w-5 h-5 text-indigo-600 mr-2" />
        <span className="font-medium text-gray-900">{projectName}</span>
        <ChevronRight
          className={`w-5 h-5 ml-auto transition-transform ${
            isExpanded ? 'rotate-90' : ''
          }`}
        />
      </button>
      
      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {references.map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferenceList;