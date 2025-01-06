import React from 'react';
import { GraduationCap } from 'lucide-react';
import Navbar from '../Landing/Navbar';
import Footer from '../Landing/Footer';
import AnimatedBackground from '../../components/landing/AnimatedBackground';
import { features } from '../../config/landingFeatures';
import FeatureCard from '../../components/landing/FeatureCard';

const Features: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <AnimatedBackground />
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <GraduationCap className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Powerful Features for Modern Research
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Everything you need to manage your research projects effectively in one place
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;