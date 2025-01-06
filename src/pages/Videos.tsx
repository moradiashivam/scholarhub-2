import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { ResearchVideo } from '../types/video';
import VideoList from '../components/videos/VideoList';

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<ResearchVideo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(videos.map(video => video.category)));

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (video: ResearchVideo) => {
    // Implement edit functionality
    console.log('Edit video:', video);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Research Videos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Curated collection of research-related videos
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Video
        </button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search videos..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {categories.map(category => (
        <VideoList
          key={category}
          category={category}
          videos={filteredVideos}
          onEdit={handleEdit}
        />
      ))}

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No videos found
          </p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            Add your first research video using the button above
          </p>
        </div>
      )}
    </div>
  );
};

export default Videos;