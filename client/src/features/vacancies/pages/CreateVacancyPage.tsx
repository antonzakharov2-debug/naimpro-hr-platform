import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createVacancyAsync } from '../slice/vacancies.slice';
import VacancyForm from '../components/VacancyForm';
import DashboardHeader from '../../dashboard/components/DashboardHeader';
import './Vacancies.css';

const CreateVacancyPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(
    (state) => state.vacancies
  );

  const handleCreate = async (data: any) => {
    const result = await dispatch(createVacancyAsync(data));

    if (createVacancyAsync.fulfilled.match(result)) {
      navigate('/vacancies', { replace: true });
    }
  };

  const handleLogout = () => {
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
                <h2 className="form-title">Create New Vacancy</h2>
                <p className="form-subtitle">Fill in the details to post a new job opening</p>
              </div>

              <VacancyForm
                loading={loading}
                error={error}
                onSubmit={handleCreate}
                submitLabel="Create Vacancy"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateVacancyPage;