import React from 'react';
import { Rss } from 'lucide-react';
import FeedList from './FeedList';
import FeedSourceManager from './FeedSourceManager';
import { useFeed } from '../../hooks/useFeed';

const RssFeedReader: React.FC = () => {
  const { 
    feeds,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    markAsRead,
    refreshFeeds
  } = useFeed();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Rss className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Research Feeds</h2>
        </div>
        <button
          onClick={refreshFeeds}
          className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Refresh feeds"
        >
          <Rss className="w-5 h-5" />
        </button>
      </div>

      <FeedSourceManager />
      
      {error && (
        <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          {error}
        </div>
      )}

      <FeedList
        feeds={feeds}
        loading={loading}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onMarkAsRead={markAsRead}
      />
    </div>
  );
};

export default RssFeedReader;