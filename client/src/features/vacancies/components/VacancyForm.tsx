import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '../pages/Vacancies.css';

interface VacancyFormProps {
  initialValues?: {
    title: string;
    description: string;
    requirements: string;
  };
  loading: boolean;
  error: string | null;
  submitLabel?: string;
  onSubmit: (data: {
    title: string;
    description: string;
    requirements: string;
  }) => void;
}

const VacancyForm = ({
  initialValues,
  loading,
  error,
  submitLabel = 'Save',
  onSubmit,
}: VacancyFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description || '');
      setRequirements(initialValues.requirements || '');
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, requirements });
  };

  return (
    <form onSubmit={handleSubmit} className="vacancy-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Job Title
        </label>
        <input
          id="title"
          type="text"
          className="form-input"
          placeholder="e.g. Senior Frontend Developer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Description
        </label>
        <div className="rich-text-editor" data-color-mode="dark">
          <MDEditor
            value={description}
            onChange={(value) => setDescription(value || '')}
            height={200}
            preview="live"
            className="md-editor-custom"
          />
        </div>
        <p className="editor-tip">
          Use Markdown for formatting: **bold**, *italic*, lists, etc.
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Requirements
        </label>
        <div className="rich-text-editor" data-color-mode="dark">
          <MDEditor
            value={requirements}
            onChange={(value) => setRequirements(value || '')}
            height={200}
            preview="live"
            className="md-editor-custom"
          />
        </div>
        <p className="editor-tip">
          Use Markdown for formatting: **bold**, *italic*, lists, etc.
        </p>
      </div>

      {error && (
        <div className="form-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="btn-spinner"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{submitLabel}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default VacancyForm;