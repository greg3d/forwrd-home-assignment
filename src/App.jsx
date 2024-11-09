import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import StoreProvider from './stores/StoreProvider.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUsers } from './stores/users/users.actions.js';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" exact element={<StatisticsPage />} />
          <Route path="/users" element={<Navigate to="/users/1" replace />} />
          <Route path="/users/:pageNumber" element={<UsersPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
