import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NoteTimestampProps {
  date: string;
}

export const NoteTimestamp: React.FC<NoteTimestampProps> = ({ date }) => (
  <div className="flex items-center text-sm text-gray-500">
    <Calendar className="w-4 h-4 mr-2" />
    <span>Updated {formatDistanceToNow(new Date(date))} ago</span>
  </div>
);