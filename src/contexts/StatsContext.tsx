import React, { createContext, useContext, useState } from 'react';

interface Stats {
  activeProjects: number;
  submissions: number; // Changed from hoursLogged
  references: number;
  researchNotes: number;
}

interface StatsContextType {
  stats: Stats;
  updateStats: () => Promise<void>;
}

const initialStats: Stats = {
  activeProjects: 0,
  submissions: 0, // Changed from hoursLogged
  references: 0,
  researchNotes: 0
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(initialStats);

  const updateStats = async () => {
    // This would normally fetch from an API
    console.log('Stats updated');
  };

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};