import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className="fixed w-full z-50 pt-8"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Oval-shaped background */}
      <div className="absolute inset-x-0 -bottom-8 mx-auto w-[98%] h-24 bg-white dark:bg-gray-900 rounded-[2rem] shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300" />
      
      <div className="container mx-auto px-8 relative">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-10">
            <NavLinks />
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="w-7 h-7 text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>

        <MobileMenu 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          id="mobile-menu"
        />
      </div>
    </nav>
  );
};

export default Navbar;