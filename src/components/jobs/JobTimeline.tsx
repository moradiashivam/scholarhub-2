import React from 'react';
import { Check, Clock } from 'lucide-react';
import { JobApplication } from '../../types/job';
import { format } from 'date-fns';

interface JobTimelineProps {
  timeline: JobApplication['timeline'];
}

const JobTimeline: React.FC<JobTimelineProps> = ({ timeline }) => {
  const timelineSteps = [
    { key: 'submissionDate', label: 'Submission Complete' },
    { key: 'securityCheckDate', label: 'Security Check' },
    { key: 'interviewDate', label: 'Interview Phase' },
    { key: 'selectionDate', label: 'Selection Decision' },
    { key: 'completionDate', label: 'Process Completed' }
  ] as const;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Application Timeline
      </h4>
      <div className="relative space-y-4">
        {timelineSteps.map((step, index) => {
          const date = timeline[step.key];
          const isCompleted = !!date;

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center
                ${isCompleted 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'}`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {step.label}
                </p>
                {date && (
                  <p className="text-xs text-gray-500">
                    {format(new Date(date), 'MMM d, yyyy')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobTimeline;