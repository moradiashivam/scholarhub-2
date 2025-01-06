import React from 'react';
import StatCard from './StatCard';
import { DASHBOARD_STATS } from './constants';
import { useStats } from '../../../contexts/StatsContext';

const StatsGrid: React.FC = () => {
  const { stats } = useStats();
  
  const statsWithValues = DASHBOARD_STATS.map(stat => ({
    ...stat,
    value: stats[stat.label.toLowerCase().replace(' ', '') as keyof typeof stats] || 0
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {statsWithValues.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsGrid;