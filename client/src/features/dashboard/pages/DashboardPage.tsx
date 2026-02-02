import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logoutUserAsync } from '../../auth/slice/auth.slice';
import { DashboardHeader, DashboardContent } from '../components';
import '../components/Dashboard.css';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await dispatch(logoutUserAsync()).unwrap();
  } catch (e) {
    // backend міг впасти — це ОК
    console.warn('Logout API failed, clearing client state');
  } finally {
    navigate('/login', { replace: true });
  }
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
        <DashboardContent />
      </div>
    </div>
  );
};

export default DashboardPage;