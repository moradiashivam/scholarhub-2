import { useState, useEffect, useCallback } from 'react';
import { FeedItem } from '../types/feed';
import { useFeedSources } from './useFeedSources';
import { fetchFeed } from '../utils/feedUtils';

export const useFeed = () => {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { sources } = useFeedSources();

  const loadFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const feedPromises = sources.map(source => fetchFeed(source.url, source.category));
      const results = await Promise.allSettled(feedPromises);
      
      const validFeeds = results
        .filter((result): result is PromiseFulfilledResult<FeedItem[]> => 
          result.status === 'fulfilled'
        )
        .flatMap(result => result.value);

      setFeeds(validFeeds
        .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
        .slice(0, 50)
      );
    } catch (err) {
      setError('Failed to load feeds. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [sources]);

  useEffect(() => {
    loadFeeds();
    const interval = setInterval(loadFeeds, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [loadFeeds]);

  const markAsRead = (id: string) => {
    setFeeds(prev => prev.map(feed =>
      feed.id === id ? { ...feed, read: true } : feed
    ));
  };

  return {
    feeds,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    markAsRead,
    refreshFeeds: loadFeeds
  };
};