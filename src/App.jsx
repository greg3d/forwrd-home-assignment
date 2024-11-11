import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<StatisticsPage />} />
        <Route path="users" element={<Navigate to="1" replace />} />
        <Route path="users/:pageNumber" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
