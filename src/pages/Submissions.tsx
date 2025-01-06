import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { JournalSubmission } from '../types/journal';
import SubmissionList from '../components/submissions/SubmissionList';
import SubmissionForm from '../components/submissions/SubmissionForm';

const Submissions: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [submissions, setSubmissions] = useState<JournalSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<JournalSubmission['status'] | 'all'>('all');
  const [editingSubmission, setEditingSubmission] = useState<JournalSubmission | null>(null);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.journalName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSubmission = (submission: Omit<JournalSubmission, 'id'>) => {
    const newSubmission: JournalSubmission = {
      ...submission,
      id: Date.now().toString()
    };
    setSubmissions([newSubmission, ...submissions]);
    setShowForm(false);
  };

  const handleEditSubmission = (submission: JournalSubmission) => {
    setEditingSubmission(submission);
    setShowForm(true);
  };

  const handleUpdateSubmission = (updatedSubmission: Omit<JournalSubmission, 'id'>) => {
    if (editingSubmission) {
      setSubmissions(submissions.map(s =>
        s.id === editingSubmission.id ? { ...updatedSubmission, id: editingSubmission.id } : s
      ));
      setEditingSubmission(null);
      setShowForm(false);
    }
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(submissions.filter(s => s.id !== id));
  };

  const handleUpdateStatus = (id: string, status: JournalSubmission['status']) => {
    setSubmissions(submissions.map(s =>
      s.id === id ? { ...s, status } : s
    ));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSubmission(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Journal Submissions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your research paper submissions
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Submission
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search submissions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as JournalSubmission['status'] | 'all')}
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="under-review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="published">Published</option>
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      <SubmissionList
        submissions={filteredSubmissions}
        onDelete={handleDeleteSubmission}
        onUpdateStatus={handleUpdateStatus}
        onEdit={handleEditSubmission}
      />

      {showForm && (
        <SubmissionForm
          onSubmit={editingSubmission ? handleUpdateSubmission : handleAddSubmission}
          onClose={handleCloseForm}
          initialData={editingSubmission}
        />
      )}
    </div>
  );
};

export default Submissions;