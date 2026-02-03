import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCandidatesAsync } from '../slice/candidates.slice';
import './Candidates.css';
import DashboardHeader from '../../dashboard/components/DashboardHeader';

const CandidatesListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useAppSelector((s) => s.candidates);

  useEffect(() => {
    dispatch(fetchCandidatesAsync());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // SVG Icon Components
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

  const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  const UserIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const UsersGroupIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const ErrorIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="dashboard-container">
          <DashboardHeader onLogout={handleLogout} />
          
          <div className="candidates-main">
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading candidates...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="dashboard-container">
          <DashboardHeader onLogout={handleLogout} />
          
          <div className="candidates-main">
            <div className="error-state">
              <ErrorIcon />
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        <div className="dashboard-container">
          <DashboardHeader onLogout={handleLogout} />

          <main className="candidates-main">
            <div className="candidates-content">
              <div className="page-header">
                <div className="page-title-section">
                  <h1 className="page-title">Candidates</h1>
                  <p className="page-subtitle">Manage your talent pool</p>
                </div>
                <Link to="/candidates/create" className="create-candidate-btn">
                  <PlusIcon />
                  <span>Create Candidate</span>
                </Link>
              </div>

              <div className="empty-state">
                <UsersGroupIcon />
                <h3>No candidates yet</h3>
                <p>Start building your talent pool by creating your first candidate profile</p>
                <Link to="/candidates/create" className="create-candidate-btn">
                  <PlusIcon />
                  <span>Create Candidate</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="dashboard-container">
        <DashboardHeader onLogout={handleLogout} />

        <main className="candidates-main">
          <div className="candidates-content">
            <div className="page-header">
              <div className="page-title-section">
                <h1 className="page-title">Candidates</h1>
                <p className="page-subtitle">
                  {items.length} {items.length === 1 ? 'candidate' : 'candidates'} in your talent pool
                </p>
              </div>
              <Link to="/candidates/create" className="create-candidate-btn">
                <PlusIcon />
                <span>Create Candidate</span>
              </Link>
            </div>

            <div className="candidates-list">
              {items.map((candidate) => (
                <div key={candidate._id} className="candidate-card">
                  <div className="candidate-card-header">
                    <h4 className="candidate-name">{candidate.name}</h4>
                  </div>

                  <div className="candidate-card-body">
                    <div className="candidate-info">
                      <div className="info-item">
                        <span className="info-icon"><EmailIcon /></span>
                        <span>{candidate.email}</span>
                      </div>
                      {candidate.phone && (
                        <div className="info-item">
                          <span className="info-icon"><PhoneIcon /></span>
                          <span>{candidate.phone}</span>
                        </div>
                      )}
                    </div>

                    {candidate.skills && (
                      <div className="candidate-skills">
                        <span className="skills-label">Skills & Notes</span>
                        <p className="skills-content">{candidate.skills}</p>
                      </div>
                    )}
                  </div>

                  <div className="candidate-card-footer">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => navigate(`/candidates/${candidate._id}/edit`)}
                    >
                      <EditIcon />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidatesListPage;