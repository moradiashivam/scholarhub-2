import React from 'react';
import { User } from '../../types/auth';

interface DashboardHeaderProps {
  user: User | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => (
  <div className="mb-8">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
      Welcome{user?.name ? `, ${user.name}` : ''}
    </h1>
    <p className="text-gray-600 dark:text-gray-400 mt-2">
      Track your research progress and manage your projects
    </p>
  </div>
);

export default DashboardHeader;