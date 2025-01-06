import React from 'react';
import { socialLinks } from './socialConfig';

export const FooterSocial: React.FC = () => (
  <div className="flex space-x-6">
    {socialLinks.map(({ icon: Icon, href, label }) => (
      <a
        key={label}
        href={href}
        className="text-gray-400 hover:text-gray-500 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="sr-only">{label}</span>
        <Icon className="h-6 w-6" />
      </a>
    ))}
  </div>
);