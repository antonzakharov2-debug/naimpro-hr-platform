import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logoutUserAsync } from '../../auth/slice/auth.slice';
import './DashboardPage.css';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUserAsync());
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <p>Welcome</p>
      </main>
    </div>
  );
};

export default DashboardPage;
