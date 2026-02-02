import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchVacanciesAsync } from '../slice/vacancies.slice';
import VacanciesList from '../components/VacanciesList';
import DashboardHeader from '../../dashboard/components/DashboardHeader';
import './Vacancies.css';

const VacanciesListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useAppSelector(
    (state) => state.vacancies
  );

  useEffect(() => {
    dispatch(fetchVacanciesAsync());
  }, [dispatch]);

  const handleCreateVacancy = () => {
    navigate('/vacancies/create');
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="dashboard-container">
        <DashboardHeader onLogout={handleLogout} />

        <main className="vacancies-main">
          <div className="vacancies-content">
            <div className="page-header">
              <div className="page-title-section">
                <h2 className="page-title">Vacancies</h2>
                <p className="page-subtitle">Manage your job openings</p>
              </div>
              <button className="create-vacancy-btn" onClick={handleCreateVacancy}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Vacancy</span>
              </button>
            </div>

            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading vacancies...</p>
              </div>
            )}

            {error && (
              <div className="error-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="64" height="64">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3>No vacancies yet</h3>
                <p>Create your first job opening to get started</p>
                <button className="create-vacancy-btn" onClick={handleCreateVacancy}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create Vacancy</span>
                </button>
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <VacanciesList vacancies={items} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VacanciesListPage;