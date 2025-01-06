import React from 'react';
import { GraduationCap } from 'lucide-react';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import AnimatedBackground from '../../components/landing/AnimatedBackground';

const About: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <GraduationCap className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About ScholarHub
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Empowering researchers with modern tools for better research management
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                ScholarHub was created with a simple but powerful mission: to make research management 
                more efficient and collaborative. We believe that researchers should spend more time 
                on their research and less time managing it.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;