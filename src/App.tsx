import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Main, NotFoundPage, Profile, Board, SignIn, SignUp, Search } from 'pages';
import { Header, Footer, Notification, Loader, ErrorBoundaryComponent } from 'components';
import { CheckRedirect } from 'hoc/CheckRedirect';
import { withErrorBoundary } from 'react-error-boundary';
import { AnimatePresence } from 'framer-motion';

const Home = lazy(() => import('pages/Home/Home'));

function App() {
  return (
    <Router>
      <Header />
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
      <Notification />
      <Footer />
    </Router>
  );
}

export default withErrorBoundary(App, {
  FallbackComponent: ErrorBoundaryComponent,
});
