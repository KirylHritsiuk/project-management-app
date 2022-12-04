import { useTranslation } from 'react-i18next';

import { Box, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import NotFound from './assets/notFound.svg';
import Face from './assets/tired.svg';
import styles from './NotFoundPage.module.scss';
import { NavLink } from 'react-router-dom';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        bgcolor: '#106354',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
      className={styles.section_notFound}
    >
      <h2>{t('NotFound')}</h2>
      <div className={styles.section_images}>
        <img src={NotFound} alt="404" />;
        <img src={Face} alt="sadness face" />;
      </div>
      <Button size="large" variant="contained">
        <KeyboardReturnIcon
          style={{
            color: '#ffffff',
          }}
        />
        <NavLink
          to={'/'}
          style={{
            color: '#ffffff',
            fontSize: '20px',
          }}
        >
          {t('go home')}
        </NavLink>
      </Button>
    </Box>
  );
};
