import React from 'react';

const FeedItemSkeleton: React.FC = () => (
  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3" />
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
    </div>
  </div>
);

export default FeedItemSkeleton;