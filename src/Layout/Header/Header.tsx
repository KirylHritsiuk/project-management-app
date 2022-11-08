import { FC } from 'react';
import styles from './Header.module.scss';

const Header: FC<{ title: string }> = ({ title }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
