import { useState, useEffect } from 'react';
import { api } from '../lib/api/axios';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../config/constants';
import { User } from '../types/auth';
import { DashboardData } from '../types/dashboard';

const initialData: DashboardData = {
  tasks: [],
  deadlines: [],
  progress: [],
  activities: []
};

export const useDashboardData = (user: User | null) => {
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const [tasksRes, deadlinesRes, progressRes, activitiesRes] = await Promise.all([
          api.get(API_ENDPOINTS.TASKS),
          api.get(API_ENDPOINTS.DEADLINES),
          api.get(API_ENDPOINTS.PROGRESS),
          api.get(API_ENDPOINTS.ACTIVITIES)
        ]);

        setData({
          tasks: tasksRes.data || [],
          deadlines: deadlinesRes.data || [],
          progress: progressRes.data || [],
          activities: activitiesRes.data || []
        });
      } catch (err) {
        setError(ERROR_MESSAGES.FETCH_FAILED);
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { data, loading, error };
};