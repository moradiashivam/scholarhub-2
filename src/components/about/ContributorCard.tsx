import React from 'react';
import { User } from 'lucide-react';
import SocialLink from './SocialLink';

interface ContributorCardProps {
  name: string;
  title: string;
  affiliation: string;
  role: string;
  orcid?: string;
  linkedin?: string;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ 
  name, 
  title, 
  affiliation, 
  role,
  orcid,
  linkedin
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
        <User className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
        <p className="text-gray-600 dark:text-gray-400">{title}</p>
      </div>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{affiliation}</p>
    <p className="text-gray-700 dark:text-gray-300 mb-4">{role}</p>
    
    <div className="flex flex-wrap gap-3">
      {orcid && <SocialLink type="orcid" href={orcid} />}
      {linkedin && <SocialLink type="linkedin" href={linkedin} />}
    </div>
  </div>
);

export default ContributorCard;