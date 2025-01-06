import React from 'react';
import StatsGrid from './stats/StatsGrid';
import TaskList from './TaskList';
import ResearchProgress from './progress/ResearchProgress';
import RecentActivities from './recent/RecentActivities';
import DigitalTimer from './timer/DigitalTimer';
import RssFeedReader from '../feed/RssFeedReader';
import { DraggableGrid } from './DraggableGrid';

const Dashboard: React.FC = () => {
  const dashboardComponents = [
    <TaskList
      key="tasks"
      tasks={[]}
      onToggleTask={() => {}}
      onAddTask={() => {}}
      onEditTask={() => {}}
      onDeleteTask={() => {}}
    />,
    <ResearchProgress key="progress" />,
    <DigitalTimer key="timer" />,
    <RecentActivities key="activities" />,
    <RssFeedReader key="feed" />
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Research Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your research progress and manage your projects
        </p>
      </div>

      <StatsGrid />

      <DraggableGrid>
        {dashboardComponents}
      </DraggableGrid>
    </div>
  );
};

export default Dashboard;