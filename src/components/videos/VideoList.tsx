import React from 'react';
import { ResearchVideo } from '../../types/video';
import VideoCard from './VideoCard';

interface VideoListProps {
  videos: ResearchVideo[];
  category: string;
  onEdit: (video: ResearchVideo) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, category, onEdit }) => {
  const categoryVideos = videos.filter(video => video.category === category);

  if (categoryVideos.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryVideos.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;