import { Translation } from 'i18nano';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.home}>
      <Link to="login">
        <Translation path="login" />
      </Link>
      <Link to="main">
        {' '}
        <Translation path="main" />
      </Link>
    </div>
  );
};
