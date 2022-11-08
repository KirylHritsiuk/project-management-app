import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export const Home = (): JSX.Element => {
  return (
    <div className={styles.home}>
      <Link to="login">Login</Link>
      <Link to="boards">Boards</Link>
    </div>
  );
};

export default Home;
