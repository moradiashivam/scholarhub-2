import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    userId: '1',
    title: 'Machine Learning Research',
    description: 'Investigating neural network architectures for natural language processing',
    status: 'ongoing',
    startDate: '2024-01-15',
    tags: ['ML', 'NLP', 'Research'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    userId: '1',
    title: 'Data Analysis Study',
    description: 'Statistical analysis of climate change data',
    status: 'planned',
    startDate: '2024-03-01',
    tags: ['Statistics', 'Climate', 'Analysis'],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '3',
    userId: '1',
    title: 'Quantum Computing Paper',
    description: 'Research on quantum algorithms',
    status: 'completed',
    startDate: '2023-12-01',
    endDate: '2024-02-01',
    tags: ['Quantum', 'Computing', 'Research'],
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  }
];