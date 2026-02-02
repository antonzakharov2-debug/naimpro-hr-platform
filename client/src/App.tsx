import { Routes, Route } from 'react-router-dom';

import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import OAuthSuccessPage from '../src/features/auth/pages/OAuthSuccessPage';
import ProtectedRoute from './app/routes/ProtectedRoute';
import CreateVacancyPage from './features/vacancies/pages/CreateVacancyPage';
import VacanciesListPage from './features/vacancies/pages/VacanciesListPage';
import EditVacancyPage from './features/vacancies/pages/EditVacancyPage';
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
      <Route
        path="/vacancies/create"
        element={
          <ProtectedRoute>
            <CreateVacancyPage />
          </ProtectedRoute>
         }
      />
      <Route
  path="/vacancies"
  element={
    <ProtectedRoute>
      <VacanciesListPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/vacancies/:vacancyId/edit"
  element={
    <ProtectedRoute>
      <EditVacancyPage />
    </ProtectedRoute>
  }
/>


    </Routes>
  );
}

export default App;
