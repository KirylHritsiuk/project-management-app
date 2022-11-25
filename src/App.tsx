import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Main, NotFoundPage, Profile, Board, SignIn, SignUp, Search } from 'pages';
import { Header, Footer, Notification, Loader } from 'components';
import { CheckRedirect } from 'hoc/CheckRedirect';

const Home = lazy(() => import('pages/Home/Home'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<CheckRedirect Component={<SignIn />} />} />
          <Route path="/signup" element={<CheckRedirect Component={<SignUp />} />} />
          <Route path="/profile" element={<CheckRedirect Component={<Profile />} />} />
          <Route path="/main" element={<CheckRedirect Component={<Main />} />} />
          <Route path="/search" element={<CheckRedirect Component={<Search />} />} />
          <Route path="/main/:id" element={<CheckRedirect Component={<Board />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Notification />
      <Footer />
    </Router>
  );
}

export default App;
