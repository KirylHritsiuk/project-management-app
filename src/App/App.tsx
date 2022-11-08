import Layout from '../Layout/Layout';
import Home from '../pages/Home/Home';
import NotFoundPage from '../pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Main from '../pages/Main/Main';
import Board from '../pages/Board/Board';
import Login from '../pages/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:boards" element={<Main />} />
        <Route path="/:boards/:id" element={<Board />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
