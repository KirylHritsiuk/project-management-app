import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';

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
