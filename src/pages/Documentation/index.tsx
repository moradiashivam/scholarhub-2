import React from 'react';
import { BookOpen, Code, Terminal, FileText, Settings, Shield } from 'lucide-react';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import Sidebar from './Sidebar';
import { sections } from './sections';

const Documentation = () => {
  const [activeSection, setActiveSection] = React.useState('getting-started');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row py-8">
            {/* Sidebar */}
            <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

            {/* Main Content */}
            <div className="flex-1 lg:pl-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {sections.map(section => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={activeSection === section.id ? '' : 'hidden'}
                  >
                    <h1 className="flex items-center gap-2 text-3xl font-bold mb-6">
                      {section.icon && <section.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
                      {section.title}
                    </h1>
                    <div className="space-y-6">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;