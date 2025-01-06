import { useState, useEffect } from 'react';
import { FeedSource } from '../types/feed';

const STORAGE_KEY = 'feed_sources';

export const useFeedSources = () => {
  const [sources, setSources] = useState<FeedSource[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sources));
  }, [sources]);

  const addSource = (source: FeedSource) => {
    setSources(prev => [...prev, source]);
  };

  const removeSource = (index: number) => {
    setSources(prev => prev.filter((_, i) => i !== index));
  };

  return { sources, addSource, removeSource };
};