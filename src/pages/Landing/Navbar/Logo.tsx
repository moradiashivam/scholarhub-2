import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Logo = () => (
  <Link 
    to="/" 
    className="flex items-center space-x-4 group"
  >
    <GraduationCap className="w-10 h-10 text-red-500 dark:text-red-400 transform transition-transform group-hover:rotate-12" />
    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent transform transition-all group-hover:scale-105">
      ScholarHub
    </h1>
  </Link>
);

export default Logo;