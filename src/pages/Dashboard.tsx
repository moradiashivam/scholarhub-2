import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardData } from '../hooks/useDashboardData';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import PageLoader from '../components/common/PageLoader';
import ErrorDisplay from '../components/common/ErrorDisplay';
import StatsGrid from '../components/dashboard/stats/StatsGrid';
import TaskList from '../components/dashboard/TaskList';
import ResearchProgress from '../components/dashboard/progress/ResearchProgress';
import RecentActivities from '../components/dashboard/recent/RecentActivities';
import DigitalTimer from '../components/dashboard/timer/DigitalTimer';
import RssFeedReader from '../components/feed/RssFeedReader';
import GridLayout from '../components/dashboard/GridLayout';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { data, loading, error } = useDashboardData(user);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <div className="p-8">
      <DashboardHeader user={user} />
      <StatsGrid />

      <GridLayout>
        <TaskList
          tasks={data.tasks}
          onToggleTask={(id) => console.log('Toggle task:', id)}
          onAddTask={(title) => console.log('Add task:', title)}
          onEditTask={(id, title) => console.log('Edit task:', id, title)}
          onDeleteTask={(id) => console.log('Delete task:', id)}
        />
        <ResearchProgress progress={data.progress} />
        <DigitalTimer />
        <RecentActivities activities={data.activities} />
        <RssFeedReader />
      </GridLayout>
    </div>
  );
};

export default Dashboard;