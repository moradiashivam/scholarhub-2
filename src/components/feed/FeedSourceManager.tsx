import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useFeedSources } from '../../hooks/useFeedSources';

const FeedSourceManager: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const { sources, addSource, removeSource } = useFeedSources();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && category) {
      addSource({ url, category });
      setUrl('');
      setCategory('');
      setShowForm(false);
    }
  };

  return (
    <div className="mb-6">
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Feed URL"
            className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Feed
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          <Plus className="w-4 h-4" />
          Add Feed Source
        </button>
      )}

      {sources.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {sources.map((source, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600"
            >
              <span className="text-gray-700 dark:text-gray-300">{source.category}</span>
              <button
                onClick={() => removeSource(index)}
                className="p-0.5 text-gray-500 hover:text-red-500 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedSourceManager;