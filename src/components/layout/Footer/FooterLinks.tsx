import React from 'react';
import { Link } from 'react-router-dom';
import { footerSections } from './footerConfig';

export const FooterLinks: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
    {footerSections.map((section) => (
      <div key={section.title}>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          {section.title}
        </h3>
        <ul className="mt-4 space-y-3">
          {section.links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="text-base text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);