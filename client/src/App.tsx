import { Routes, Route } from 'react-router-dom';

import LoginForm from './features/auth/components/LoginForm';
import RegisterForm from './features/auth/components/RegisterForm';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import OAuthSuccessPage from './features/auth/pages/OAuthSuccessPage';

import ProtectedRoute from './app/routes/ProtectedRoute';

import CreateVacancyPage from './features/vacancies/pages/CreateVacancyPage';
import VacanciesListPage from './features/vacancies/pages/VacanciesListPage';
import EditVacancyPage from './features/vacancies/pages/EditVacancyPage';

import CandidatesListPage from './features/candidates/pages/CandidatesListPage';
import CreateCandidatePage from './features/candidates/pages/CreateCandidatePage';
import EditCandidatePage from './features/candidates/pages/EditCandidatePage';

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/oauth-success" element={<OAuthSuccessPage />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/vacancies">
          <Route index element={<VacanciesListPage />} />
          <Route path="create" element={<CreateVacancyPage />} />
          <Route path=":vacancyId/edit" element={<EditVacancyPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
  <Route path="/candidates">
    <Route index element={<CandidatesListPage />} />
    <Route path="create" element={<CreateCandidatePage />} />
    <Route path=":candidateId/edit" element={<EditCandidatePage />} />
  </Route>
</Route>

      </Route>
    </Routes>
  );
}

export default App;
