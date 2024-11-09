import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import StoreProvider from './stores/StoreProvider.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUsers } from './stores/users/users.actions.js';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" exact element={<StatisticsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
