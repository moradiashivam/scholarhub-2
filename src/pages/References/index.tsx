import React, { useState } from 'react';
import { Reference } from '../../types';
import ReferencesHeader from './ReferencesHeader';
import SearchAndFilter from './SearchAndFilter';
import EmptyState from './EmptyState';
import ReferenceList from '../../components/ReferenceList';
import ReferenceForm from '../../components/references/ReferenceForm';

const References = () => {
  const [showReferenceForm, setShowReferenceForm] = useState(false);
  const [references, setReferences] = useState<Record<string, Reference[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleAddReference = (referenceData: Omit<Reference, 'id'>) => {
    const newReference: Reference = {
      ...referenceData,
      id: Date.now().toString()
    };

    const projectName = referenceData.projectId === 'ml-research' 
      ? 'Machine Learning Research' 
      : 'Data Analysis Study';

    setReferences(prev => ({
      ...prev,
      [projectName]: [...(prev[projectName] || []), newReference]
    }));
    setShowReferenceForm(false);
  };

  return (
    <div className="p-8">
      <ReferencesHeader onNewReference={() => setShowReferenceForm(true)} />
      <SearchAndFilter
        searchTerm={searchTerm}
        selectedType={selectedType}
        onSearchChange={setSearchTerm}
        onTypeChange={setSelectedType}
      />

      {Object.keys(references).length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {Object.entries(references).map(([projectName, projectRefs]) => (
            <ReferenceList
              key={projectName}
              projectName={projectName}
              references={projectRefs}
            />
          ))}
        </div>
      )}

      {showReferenceForm && (
        <ReferenceForm
          onSubmit={handleAddReference}
          onClose={() => setShowReferenceForm(false)}
        />
      )}
    </div>
  );
};

export default References;