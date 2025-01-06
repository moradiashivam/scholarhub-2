import { BarChart, Clock, BookOpen, FileText } from 'lucide-react';

export const DASHBOARD_STATS = [
  {
    icon: BarChart,
    label: 'Active Projects',
    value: 0,
    color: 'bg-blue-500'
  },
  {
    icon: Clock,
    label: 'Submissions',
    value: 0,
    color: 'bg-green-500'
  },
  {
    icon: BookOpen,
    label: 'References',
    value: 0,
    color: 'bg-purple-500'
  },
  {
    icon: FileText,
    label: 'Research Notes',
    value: 0,
    color: 'bg-orange-500'
  }
];