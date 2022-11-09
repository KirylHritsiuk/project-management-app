import Layout from '../Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { Home, Main, NotFoundPage, User, Login, Board } from '../pages';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/:id" element={<Board />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
