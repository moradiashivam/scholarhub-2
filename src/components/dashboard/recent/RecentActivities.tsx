import React from 'react';
import { Clock, FileText, BookOpen, FolderOpen } from 'lucide-react';

interface Activity {
  id: string;
  type: 'note' | 'reference' | 'project';
  title: string;
  timestamp: string;
}

const RecentActivities: React.FC = () => {
  const activities: Activity[] = [];

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'note':
        return FileText;
      case 'reference':
        return BookOpen;
      case 'project':
        return FolderOpen;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const Icon = getIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">{activity.title}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-4">No recent activities</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;