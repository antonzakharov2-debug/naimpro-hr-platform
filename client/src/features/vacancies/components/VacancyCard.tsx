import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAppDispatch } from '../../../app/hooks';
import {
  hideVacancyAsync,
  deleteVacancyAsync,
} from '../slice/vacancies.slice';
import type { Vacancy } from '../types';

const VacancyCard = ({ vacancy }: { vacancy: Vacancy }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleHide = () => {
    dispatch(hideVacancyAsync(vacancy._id));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this vacancy?'
    );
    if (confirmed) {
      dispatch(deleteVacancyAsync(vacancy._id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'closed':
        return 'status-closed';
      case 'draft':
        return 'status-draft';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="vacancy-card">
      <div className="vacancy-card-header">
        <h3 className="vacancy-title">{vacancy.title}</h3>
        <span className={`vacancy-status ${getStatusColor(vacancy.status)}`}>
          {vacancy.status}
        </span>
      </div>

      <div className="vacancy-card-body">
<div className="vacancy-section">
  <h4 className="section-label">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    Description
  </h4>
  <div className="section-content rich-text-content">
    <ReactMarkdown>
      {vacancy.description || '*No description provided*'}
    </ReactMarkdown>
  </div>
</div>

        <div className="vacancy-section">
  <h4 className="section-label">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
    Requirements
  </h4>
  <div className="section-content rich-text-content">
    <ReactMarkdown>
      {vacancy.requirements || '*No requirements specified*'}
    </ReactMarkdown>
  </div>
</div>
      </div>

      <div className="vacancy-card-footer">
        <div className="vacancy-meta">
          <span className="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Created: {new Date(vacancy.createdAt).toLocaleDateString()}
          </span>
          {vacancy.updatedAt && (
            <span className="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Updated: {new Date(vacancy.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="vacancy-actions">
          <button 
            className="action-btn edit-btn" 
            onClick={() => navigate(`/vacancies/${vacancy._id}/edit`)}
            title="Edit vacancy"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>

          <button 
            className="action-btn hide-btn" 
            onClick={handleHide}
            title="Hide vacancy"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <span>Hide</span>
          </button>

          <button 
            className="action-btn delete-btn" 
            onClick={handleDelete}
            title="Delete vacancy"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;