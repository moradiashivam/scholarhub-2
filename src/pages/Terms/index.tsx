import React from 'react';
import { Scale, FileText, Shield } from 'lucide-react';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import TermsSection from './TermsSection';
import { termsSections } from './sections';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Scale className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-12">
              {termsSections.map((section, index) => (
                <TermsSection key={index} {...section} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;