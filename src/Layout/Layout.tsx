import Footer from '../Layout/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from '../Layout/Header/Header';

export const Layout = () => {
  return (
    <>
      <Header title="Project Management App" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
