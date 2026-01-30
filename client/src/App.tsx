import { Routes, Route } from 'react-router-dom';

import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import OAuthSuccessPage from '../src/features/auth/pages/OAuthSuccessPage';
import ProtectedRoute from './app/routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/oauth-success" element={<OAuthSuccessPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
