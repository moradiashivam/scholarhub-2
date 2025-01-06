import React from 'react';
import { GraduationCap } from 'lucide-react';
import { FooterLinks } from './FooterLinks';
import { FooterSocial } from './FooterSocial';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">ScholarHub</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Making research management simple and efficient for academics and professionals.
            </p>
            <FooterSocial />
          </div>
          <div className="mt-12 xl:mt-0 xl:col-span-2">
            <FooterLinks />
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {currentYear} ScholarHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;