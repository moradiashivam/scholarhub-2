export type VideoPriority = 'High' | 'Medium' | 'Low';

export interface VideoTimestamp {
  time: string;
  note: string;
}

export interface ResearchVideo {
  id: string;
  title: string;
  creator: string;
  url: string;
  duration: string;
  description: string;
  priority: VideoPriority;
  category: string;
  topics: string[];
  timestamps: VideoTimestamp[];
  addedAt: string;
}