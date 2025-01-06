import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { JobApplication } from '../types/job';
import JobList from '../components/jobs/JobList';
import JobForm from '../components/jobs/JobForm';
import { exportJobsToExcel } from '../utils/excelExport';

const Jobs: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobApplication['status'] | 'all'>('all');
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddApplication = (application: Omit<JobApplication, 'id'>) => {
    const newApplication: JobApplication = {
      ...application,
      id: Date.now().toString()
    };
    setApplications([newApplication, ...applications]);
    setShowForm(false);
  };

  const handleUpdateApplication = (updatedApplication: JobApplication) => {
    setApplications(applications.map(app =>
      app.id === updatedApplication.id ? updatedApplication : app
    ));
    setShowForm(false);
    setEditingApplication(null);
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const handleExport = () => {
    exportJobsToExcel(filteredApplications);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Job Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your research and academic job applications
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={applications.length === 0}
          >
            <Download className="w-5 h-5 mr-2" />
            Export to Excel
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Application
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as JobApplication['status'] | 'all')}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="submission-complete">Submission Complete</option>
            <option value="security-check">Security Check</option>
            <option value="interview-phase">Interview Phase</option>
            <option value="selected">Selected</option>
            <option value="not-selected">Not Selected</option>
            <option value="process-completed">Process Completed</option>
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      <JobList
        applications={filteredApplications}
        onEdit={(app) => {
          setEditingApplication(app);
          setShowForm(true);
        }}
        onDelete={handleDeleteApplication}
      />

      {showForm && (
        <JobForm
          onSubmit={editingApplication ? handleUpdateApplication : handleAddApplication}
          onClose={() => {
            setShowForm(false);
            setEditingApplication(null);
          }}
          initialData={editingApplication}
        />
      )}
    </div>
  );
};

export default Jobs;