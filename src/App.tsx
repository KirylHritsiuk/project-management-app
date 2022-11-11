import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Main, NotFoundPage, User, Board, SignUp, SignIn } from './pages';
import { Header, Footer } from './components';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/:id" element={<Board />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
