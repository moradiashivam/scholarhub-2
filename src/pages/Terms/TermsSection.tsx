import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TermsSectionProps {
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
}

const TermsSection: React.FC<TermsSectionProps> = ({ icon: Icon, title, content }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="prose prose-indigo dark:prose-invert max-w-none">
        {content}
      </div>
    </section>
  );
};

export default TermsSection;