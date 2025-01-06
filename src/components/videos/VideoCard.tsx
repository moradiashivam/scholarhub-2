import React from 'react';
import { Clock, Tag, ExternalLink, Star } from 'lucide-react';
import { ResearchVideo, VideoPriority } from '../../types/video';

interface VideoCardProps {
  video: ResearchVideo;
  onEdit: (video: ResearchVideo) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onEdit }) => {
  const priorityColors: Record<VideoPriority, string> = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {video.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[video.priority]}`}>
          {video.priority}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        by {video.creator}
      </p>

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Clock className="w-4 h-4 mr-2" />
        <span>{video.duration}</span>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
        {video.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {video.topics.map((topic) => (
          <span
            key={topic}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <Tag className="w-3 h-3 mr-1" />
            {topic}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center text-sm"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Watch Video
        </a>
        <button
          onClick={() => onEdit(video)}
          className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default VideoCard;