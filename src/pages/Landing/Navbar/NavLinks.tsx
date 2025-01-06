import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => (
  <Link
    to={to}
    className="inline-flex items-center px-4 py-2 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors relative group"
  >
    <span className="relative">
      {children}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-500 dark:bg-red-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
    </span>
  </Link>
);

const NavLinks = () => (
  <div className="flex items-center space-x-2">
    <NavLink to="/features">Features</NavLink>
    <NavLink to="/about">About</NavLink>
    <NavLink to="/contact">Contact</NavLink>
  </div>
);

export default NavLinks;