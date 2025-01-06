import React from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { FeedItem } from '../../types/feed';
import FeedItemSkeleton from './FeedItemSkeleton';

interface FeedListProps {
  feeds: FeedItem[];
  loading: boolean;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onMarkAsRead: (id: string) => void;
}

const FeedList: React.FC<FeedListProps> = ({
  feeds,
  loading,
  selectedCategory,
  onCategoryChange,
  onMarkAsRead
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <FeedItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  const categories = Array.from(new Set(feeds.map(feed => feed.category)));

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {feeds
          .filter(feed => !selectedCategory || feed.category === selectedCategory)
          .slice(0, 50)
          .map(feed => (
            <div
              key={feed.id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <a
                  href={feed.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {feed.title}
                </a>
                <button
                  onClick={() => onMarkAsRead(feed.id)}
                  className={`p-1 rounded-full transition-opacity flex-shrink-0 ${
                    feed.read
                      ? 'text-green-500'
                      : 'text-gray-400 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {new Date(feed.pubDate).toLocaleDateString()} • {feed.source}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {feed.description}
              </p>
              <div className="flex items-center mt-2 text-xs text-indigo-600 dark:text-indigo-400 group-hover:underline">
                Read more
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedList;