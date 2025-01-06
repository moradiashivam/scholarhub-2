import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">ScholarHub</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Making research management simple and efficient for academics and professionals.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={Twitter} label="Twitter" />
              <SocialLink href="#" icon={Github} label="GitHub" />
              <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Product</h3>
            <FooterLinks
              links={[
                { label: 'Features', href: '/features' },
                { label: 'Documentation', href: '/docs' },
                { label: 'Updates', href: '/updates' }
              ]}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h3>
            <FooterLinks
              links={[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' }
              ]}
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ScholarHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="sr-only">{label}</span>
    <Icon className="w-6 h-6" />
  </a>
);

const FooterLinks = ({ links }: { links: { label: string, href: string }[] }) => (
  <ul className="space-y-4">
    {links.map((link) => (
      <li key={link.href}>
        <Link
          to={link.href}
          className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

export default Footer;