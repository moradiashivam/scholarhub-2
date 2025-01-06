export type JobApplicationStatus = 
  | 'submission-complete'
  | 'security-check'
  | 'interview-phase'
  | 'selected'
  | 'not-selected'
  | 'process-completed';

export interface JobApplication {
  id: string;
  position: string;
  organization: string;
  department?: string;
  location: string;
  status: JobApplicationStatus;
  applicationDate: string;
  lastUpdated: string;
  nextSteps?: string;
  notes?: string;
  timeline: {
    submissionDate?: string;
    securityCheckDate?: string;
    interviewDate?: string;
    selectionDate?: string;
    completionDate?: string;
  };
}