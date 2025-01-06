import React from 'react';
import { Linkedin } from 'lucide-react';

interface SocialLinkProps {
  type: 'linkedin' | 'orcid';
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ type, href }) => {
  if (type === 'linkedin') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        <Linkedin className="w-4 h-4 mr-1.5" />
        LinkedIn
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
    >
      <img src="https://orcid.org/assets/vectors/orcid.logo.icon.svg" className="w-4 h-4 mr-1.5" alt="ORCID" />
      ORCID
    </a>
  );
};

export default SocialLink;