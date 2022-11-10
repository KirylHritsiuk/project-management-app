/* eslint-disable react/no-children-prop */
import { Skeleton } from '@mui/material';
import { Translation } from 'i18nano';
import { LanguageChange } from '../../tranlation';
import styles from './Header.module.scss';

const skeleton = <Skeleton variant="text" animation="wave" width={400} height={40} />;

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 style={{ height: '40px', minWidth: '400px' }}>
        <Translation path="title" children={skeleton} />
      </h1>
      <LanguageChange />
    </header>
  );
};

export default Header;
