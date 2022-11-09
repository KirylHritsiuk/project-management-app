import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.home}>
      <Link to="login">Login</Link>
      <Link to="main">Boards</Link>
    </div>
  );
};
