export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DashboardData {
  tasks: Task[];
  deadlines: any[];
  progress: any[];
  activities: any[];
}

export interface DashboardStats {
  activeProjects: number;
  completedTasks: number;
  upcomingDeadlines: number;
  totalReferences: number;
}