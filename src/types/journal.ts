export type DocumentType = 'research-article' | 'review-article' | 'case-study' | 'conference-paper' | 'book-chapter' | 'thesis' | 'other';

export interface JournalSubmission {
  id: string;
  title: string;
  authors: string[];
  documentType: DocumentType;
  submissionDate: string;
  journalName: string;
  indexingPlatform: string;
  status: 'submitted' | 'under-review' | 'accepted' | 'rejected' | 'published';
  notes?: string;
  manuscriptId?: string;
  responseDate?: string;
}

export const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: 'research-article', label: 'Research Article' },
  { value: 'review-article', label: 'Review Article' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'conference-paper', label: 'Conference Paper' },
  { value: 'book-chapter', label: 'Book Chapter' },
  { value: 'thesis', label: 'Thesis' },
  { value: 'other', label: 'Other' }
];