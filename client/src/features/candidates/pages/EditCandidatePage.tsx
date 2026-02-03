import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { assignVacancyAsync } from '../slice/candidates.slice';
import { fetchVacanciesAsync } from '../../vacancies/slice/vacancies.slice';
import {
  fetchCandidateByIdAsync,
  updateCandidateAsync,
  deleteCandidateAsync,
} from '../slice/candidates.slice';
import './Candidates.css';

const EditCandidatePage = () => {
  const { candidateId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selected, loading, error } = useAppSelector((s) => s.candidates);
  const { items: vacancies } = useAppSelector((s) => s.vacancies);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
  });

  useEffect(() => {
    if (candidateId) {
      dispatch(fetchCandidateByIdAsync(candidateId));
    }
  }, [candidateId, dispatch]);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        email: selected.email,
        phone: selected.phone || '',
        skills: selected.skills || '',
      });
    }
  }, [selected]);

  useEffect(() => {
    dispatch(fetchVacanciesAsync());
  }, [dispatch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateId) return;
    await dispatch(updateCandidateAsync({ id: candidateId, data: form }));
    navigate('/candidates');
  };

  const deleteHandler = async () => {
    if (!candidateId) return;
    if (!confirm('Are you sure you want to delete this candidate?')) return;
    await dispatch(deleteCandidateAsync(candidateId));
    navigate('/candidates');
  };

  // SVG Icon Components
  const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );

  const TargetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );

  const DocumentIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );

  const SaveIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );

  const DeleteIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );

  const ErrorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  const SpinnerIcon = () => (
    <div className="btn-spinner"></div>
  );

  const LoadingErrorIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  if (loading && !selected) {
    return (
      <div className="candidates-page">
        <div className="candidates-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="candidates-container">
          <div className="candidates-main">
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading candidate...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="candidates-page">
        <div className="candidates-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="candidates-container">
          <div className="candidates-main">
            <div className="error-state">
              <LoadingErrorIcon />
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="candidates-page">
      <div className="candidates-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="candidates-container">
        <div className="candidates-main">
          <div className="form-content">
            <div className="form-card">
              <div className="form-card-header">
                <h2 className="form-title">Edit Candidate</h2>
                <p className="form-subtitle">Update candidate information</p>
              </div>

              <form onSubmit={submitHandler} className="candidate-form">
                <div className="form-group">
                  <label className="form-label">
                    <UserIcon />
                    <span>Full Name *</span>
                  </label>
                  <input
                    className="form-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <EmailIcon />
                    <span>Email Address *</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <PhoneIcon />
                    <span>Phone Number</span>
                  </label>
                  <input
                    className="form-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <BriefcaseIcon />
                    <span>Skills & Notes</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    value={form.skills}
                    onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  />
                </div>

                {error && (
                  <div className="form-error">
                    <ErrorIcon />
                    <span>{error}</span>
                  </div>
                )}

                <div className="assignment-section">
                  <h3 className="section-title">
                    <TargetIcon />
                    <span>Assign to Vacancy</span>
                  </h3>

                  <div className="form-group">
                    <label className="form-label">
                      <DocumentIcon />
                      <span>Select Vacancy</span>
                    </label>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        dispatch(
                          assignVacancyAsync({
                            candidateId: candidateId!,
                            vacancyId: e.target.value,
                          })
                        )
                      }
                    >
                      <option value="">Choose a vacancy...</option>
                      {vacancies.map((v) => (
                        <option key={v._id} value={v._id}>
                          {v.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <SpinnerIcon />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <SaveIcon />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>

                  <button type="button" className="delete-btn" onClick={deleteHandler}>
                    <DeleteIcon />
                    <span>Delete Candidate</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCandidatePage;