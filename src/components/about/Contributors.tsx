import React from 'react';
import ContributorCard from './ContributorCard';

const Contributors: React.FC = () => (
  <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
        Developers & Contributors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <ContributorCard
          name="Shivam Moradia"
          title="Developer and Technical Contributor"
          affiliation="College Librarian, St. Xavier's College (Autonomous), Ahmedabad"
          role="Shivam Moradia has been instrumental in the technical and feature development of this project. His expertise in library sciences and technical acumen have ensured the integration of user-focused and innovative functionalities."
          orcid="https://orcid.org/0000-0002-1234-5678"
          linkedin="https://www.linkedin.com/in/shivam-moradia-5a3703103"
        />
        <ContributorCard
          name="Dr. Meghna Vyas"
          title="Feature Guide"
          affiliation="Head and Associate Professor, PG Department of Library and Information Science, Sardar Patel University"
          role="As the Feature Guide, Dr. Meghna Vyas provided guidance and oversight, ensuring the project aligns with academic and practical standards in library and information science. Her mentorship has been vital in shaping the vision and scope of this initiative."
          orcid="https://orcid.org/0000-0002-8765-4321"
          linkedin="https://www.linkedin.com/in/dr-meghna-vyas-461968a2"
        />
      </div>
    </div>
  </section>
);

export default Contributors;