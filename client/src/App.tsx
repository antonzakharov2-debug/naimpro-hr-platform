import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import RegisterPage from './features/auth/pages/RegisterPage';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<div>Dashboard</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
