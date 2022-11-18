import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Main, NotFoundPage, Profile, Board, SignIn, SignUp } from './pages';
import { Header, Footer, Notification } from './components';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/:id" element={<Board />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Notification />
      <Footer />
    </Router>
  );
}

export default App;
