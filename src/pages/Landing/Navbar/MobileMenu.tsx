import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const MobileMenu = ({ isOpen, onClose, id }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div 
      id={id}
      className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg rounded-b-2xl border-t border-gray-200 dark:border-gray-800 md:hidden transform transition-all duration-300"
    >
      <div className="p-4 space-y-3">
        <MobileLink to="/features" onClick={onClose}>Features</MobileLink>
        <MobileLink to="/about" onClick={onClose}>About</MobileLink>
        <MobileLink to="/contact" onClick={onClose}>Contact</MobileLink>
        
        <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <MobileLink to="/login" onClick={onClose}>Sign In</MobileLink>
          <Link
            to="/register"
            onClick={onClose}
            className="block w-full py-2 text-center text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg hover:from-red-600 hover:to-orange-600 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

const MobileLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

export default MobileMenu;