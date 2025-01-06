import { FeedItem } from '../types/feed';

export const fetchFeed = async (url: string, category: string): Promise<FeedItem[]> => {
  try {
    const response = await fetch(`/api/feed?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error('Failed to fetch feed');
    
    const data = await response.json();
    return data.items.map((item: any) => ({
      id: item.guid || item.link,
      title: item.title,
      description: item.description,
      link: item.link,
      pubDate: item.pubDate,
      source: item.source || new URL(url).hostname,
      category,
      read: false
    }));
  } catch (error) {
    console.error('Error fetching feed:', error);
    return [];
  }
};