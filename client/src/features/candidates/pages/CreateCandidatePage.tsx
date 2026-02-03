import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createCandidateAsync } from '../slice/candidates.slice';
import './Candidates.css';

const CreateCandidatePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((s) => s.candidates);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createCandidateAsync(form));
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

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12"></polyline>
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
                <h2 className="form-title">Create Candidate</h2>
                <p className="form-subtitle">Add a new candidate to your talent pool</p>
              </div>

              <form onSubmit={submitHandler} className="candidate-form">
                <div className="form-group">
                  <label className="form-label">
                    <UserIcon />
                    <span>Full Name *</span>
                  </label>
                  <input
                    className="form-input"
                    placeholder="Enter candidate's full name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <EmailIcon />
                    <span>Email Address *</span>
                  </label>
                  <input
                    className="form-input"
                    placeholder="candidate@example.com"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <PhoneIcon />
                    <span>Phone Number</span>
                  </label>
                  <input
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
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
                    placeholder="Add candidate's skills, experience, or any relevant notes..."
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

                <div className="form-actions">
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <SpinnerIcon />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <CheckIcon />
                        <span>Create Candidate</span>
                      </>
                    )}
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

export default CreateCandidatePage;