import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchVacancyByIdAsync,
  updateVacancyAsync,
} from '../slice/vacancies.slice';
import VacancyForm from '../components/VacancyForm';
import DashboardHeader from '../../dashboard/components/DashboardHeader';
import './Vacancies.css';

const EditVacancyPage = () => {
  const { vacancyId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selected, loading, error } = useAppSelector(
    (state) => state.vacancies
  );

  useEffect(() => {
    if (vacancyId) {
      dispatch(fetchVacancyByIdAsync(vacancyId));
    }
  }, [vacancyId, dispatch]);

  const handleSubmit = async (data: any) => {
    if (!vacancyId) return;

    const result = await dispatch(
      updateVacancyAsync({ id: vacancyId, data })
    );

    if (updateVacancyAsync.fulfilled.match(result)) {
      navigate('/vacancies');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (loading && !selected) {
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
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading vacancy...</p>
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

        <main className="vacancies-main">
          <div className="form-content">
            <div className="form-card">
              <div className="form-card-header">
                <button 
                  className="back-button" 
                  onClick={() => navigate('/vacancies')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Vacancies</span>
                </button>
                <h2 className="form-title">Edit Vacancy</h2>
                <p className="form-subtitle">Update the job opening details</p>
              </div>

              <VacancyForm
                initialValues={selected ?? undefined}
                loading={loading}
                error={error}
                onSubmit={handleSubmit}
                submitLabel="Update Vacancy"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditVacancyPage;