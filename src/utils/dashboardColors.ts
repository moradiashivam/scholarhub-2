export const panelColors = {
  tasks: {
    border: 'border-blue-400 dark:border-blue-500',
    header: 'bg-blue-50 dark:bg-blue-900/30'
  },
  deadlines: {
    border: 'border-cyan-400 dark:border-cyan-500',
    header: 'bg-cyan-50 dark:bg-cyan-900/30'
  },
  progress: {
    border: 'border-sky-400 dark:border-sky-500',
    header: 'bg-sky-50 dark:bg-sky-900/30'
  },
  timer: {
    border: 'border-teal-400 dark:border-teal-500',
    header: 'bg-teal-50 dark:bg-teal-900/30'
  },
  activities: {
    border: 'border-blue-400 dark:border-blue-500',
    header: 'bg-blue-50 dark:bg-blue-900/30'
  },
  feed: {
    border: 'border-sky-400 dark:border-sky-500',
    header: 'bg-sky-50 dark:bg-sky-900/30'
  }
};

export type PanelType = keyof typeof panelColors;