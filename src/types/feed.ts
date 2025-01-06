export interface FeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  read: boolean;
}

export interface FeedSource {
  url: string;
  category: string;
}