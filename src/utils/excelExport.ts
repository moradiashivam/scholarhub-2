import { JobApplication } from '../types/job';

export const exportJobsToExcel = (jobs: JobApplication[]) => {
  // Create CSV content
  const headers = [
    'Position',
    'Organization',
    'Department',
    'Location',
    'Status',
    'Application Date',
    'Next Steps',
    'Notes'
  ];

  const rows = jobs.map(job => [
    job.position,
    job.organization,
    job.department || '',
    job.location,
    job.status,
    job.applicationDate,
    job.nextSteps || '',
    job.notes || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `job_applications_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};